class  MySecondExtension  extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  load() {
    console.log('MySecondExtension has been loaded');
    this.viewer.setLightPreset(2);
    this.viewer.setEnvMapBackground(false);
    this.viewer.setBackgroundColor(255,0,0,255,255,255);

    return true;
  }

  unload() {
    console.log('MySecondExtension has been unloaded');
    return true;
  }

  onToolbarCreated() {

    const  groupName = "Generals";

    let generalsGroups =  null
    generalsGroups = this.viewer.toolbar.getControl(groupName);
    if (!generalsGroups) {
      generalsGroups = new Autodesk.Viewing.UI.ControlGroup(groupName);
      this.viewer.toolbar.addControl(generalsGroups);
    }


    const button = new Autodesk.Viewing.UI.Button("MySecondExtension");

    button.onClick = (ev) => {
      alert('My Second Extension is running!');
    };
    button.setToolTip('My Second Extension');
    button.addClass('my-Second-extension-button');


    generalsGroups.addControl(button);

  }

}

Autodesk.Viewing.theExtensionManager.registerExtension('MySecondExtensionAB', MySecondExtension);