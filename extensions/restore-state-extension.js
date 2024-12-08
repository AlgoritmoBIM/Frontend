class  RestoreStateExtension  extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
      super(viewer, options);
    }
  
    load() {
      console.log( 'RestoreStateExtension has been loaded');
      this.viewer.setLightPreset(2);
      this.viewer.setEnvMapBackground(false);
      this.viewer.setBackgroundColor(255,0,0,255,255,255);
  
      return true;
    }
  
    unload() {
      console.log( 'RestoreStateExtension has been unloaded');
      return true;
    }
  
    onToolbarCreated() {
  
      const  groupName = "stateGroup";
  
      let generalsGroups =  null
      generalsGroups = this.viewer.toolbar.getControl(groupName);
      if (!generalsGroups) {
        generalsGroups = new Autodesk.Viewing.UI.ControlGroup(groupName);
        this.viewer.toolbar.addControl(generalsGroups);
      }
  
  
      const button = new Autodesk.Viewing.UI.Button( "RestoreStateExtension");
  
      button.onClick = (ev) => {
        const viewerStates = JSON.parse(localStorage.getItem('viewerStates'));

        if(!viewerStates) return;

        const panelData =
        {
          viewerStates,
          viewer: this.viewer
        }

        const statePanel = new StatePanel(
          this.viewer.container,
          "statePanel",
          "Restore Panel",
          {},
          panelData
        );
        statePanel.setVisible(true);
      };


      button.setToolTip('restore state');
      button.addClass('my-Restore-state-extension-button');
  
  
      generalsGroups.addControl(button);
  
    }
  
  }
  
  Autodesk.Viewing.theExtensionManager.registerExtension('RestoreStateExtension', RestoreStateExtension);


  class StatePanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(parentContainer, id, title, options, panelData) {
      super(parentContainer, id, title, options,panelData);
      this.container.style.top = "10px";
      this.container.style.left = "10px";
      this.container.style.width = "auto";
      this.container.style.height = "auto";
      this.container.style.resize = "auto";
      this.container.style.minWidth = "200px";
      this.container.style.minHeight = "300px";

      this.container.style.backgroundColor = "black";
      this.container.style.color = "white";

      this.container.classList.add("state-panel");

      const content = document.createElement("div");
      content.style.padding = "6px";
      content.classList.add("state-panel-content");

      for(let i=0; i< panelData.viewerStates.length; i++) {
        const button = document.createElement("button");
        button.innerText = `State ${i+1}`;
        button.addEventListener("click", () => {
          panelData.viewer.restoreState(panelData.viewerStates[i]);
        });
        content.appendChild(button);
      }

      this.container.appendChild(content);
    };
  }