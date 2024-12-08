class  SaveStateExtension  extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
      super(viewer, options);
    }
  
    load() {
      console.log( 'SaveStateExtension has been loaded');
      this.viewer.setLightPreset(2);
      this.viewer.setEnvMapBackground(false);
      this.viewer.setBackgroundColor(255,0,0,255,255,255);
  
      return true;
    }
  
    unload() {
      console.log( 'SaveStateExtension has been unloaded');
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
  
  
      const button = new Autodesk.Viewing.UI.Button( "SaveStateExtension");
  
      button.onClick = (ev) => {

        const state = this.viewer.getState();

        let viewerStates = JSON.parse(localStorage.getItem('viewerStates')) || [];

        viewerStates.push(state)


        localStorage.setItem('viewerStates', JSON.stringify(viewerStates));


      };
      button.setToolTip('save state');
      button.addClass('my-Save-state-extension-button');
  
  
      generalsGroups.addControl(button);
  
    }
  
  }
  
  Autodesk.Viewing.theExtensionManager.registerExtension('SaveStateExtension', SaveStateExtension);