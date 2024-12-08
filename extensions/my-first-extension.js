class  MyFirstExtension  extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  load() {
    console.log('MyFirstExtension has been loaded');
    this.viewer.setLightPreset(2);
    this.viewer.setEnvMapBackground(false);
    this.viewer.setBackgroundColor(255,0,0,255,255,255);

    return true;
  }

  unload() {
    console.log('MyFirstExtension has been unloaded');
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


    const button = new Autodesk.Viewing.UI.Button("MyFirstExtension");

    button.onClick = (ev) => {
      alert('My First Extension is running!');
    };
    button.setToolTip('My First Extension');
    button.addClass('my-first-extension-button');


    generalsGroups.addControl(button);

  }

}

Autodesk.Viewing.theExtensionManager.registerExtension('MyFirstExtensionAB', MyFirstExtension);