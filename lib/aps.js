import '../extensions/my-first-extension';
import '../extensions/my-Second-extension';
import '../extensions/save-state-extension';
import '../extensions/restore-state-extension';

export const initViewer = async (urn) => {
    const response = await fetch('http://localhost:3000/auth/get-token')
        const data = await response.json()
        
        const access_token = data.data.access_token

        const options = {
            env: 'AutodeskProduction',
            api: 'derivativeV2',
            accessToken: access_token
        };

    const config = {
        extensions: ['Autodesk.DocumentBrowser', 'Autodesk.AEC.Minimap3DExtension','MyFirstExtensionAB','MySecondExtensionAB', 'SaveStateExtension', 'RestoreStateExtension'],
    }

    const viewerContainer = document.getElementById('myViewer')
    const viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config)


    //const urn = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXNkYXNrZGphc25kbGdmc2ZzZGdzYXNkbGFzZGthc2Rtdm9tdHIvcmFjYmFzaWNzYW1wbGVwcm9qZWN0LnJ2dA"
    const documentId = 'urn:' + urn

    Autodesk.Viewing.Initializer(options, () => {
        const starCode = viewer.start();

        if (starCode > 0) {
            console.error('Failed to create a Viewer: Error Code: ' + starCode)
        }

        window.algoritmoBIM  = viewer;

        Autodesk.Viewing.Document.load(
            documentId,
            (documentUrn) => {
                const defaultModel = documentUrn.getRoot().getDefaultGeometry();

                viewer.loadDocumentNode(documentUrn, defaultModel)
            },
            () => {
                console.log('Document NOT loaded');
            }
        );
    })
}

export const initMultiViewer = async (urns) => {
    const response = await fetch('http://localhost:3000/auth/get-token')
    const data = await response.json()
    
    const access_token = data.data.access_token

    const options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2',
        accessToken: access_token
    };

const config = {
    extensions: ['Autodesk.DocumentBrowser', 'Autodesk.AEC.Minimap3DExtension'],
}

const viewerContainer = document.getElementById('multiViewer')
const viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config)


Autodesk.Viewing.Initializer(options, async () => {
    const starCode = viewer.start();

    if (starCode > 0) {
        console.error('Failed to create a Viewer: Error Code: ' + starCode)
    }

    await urns.map(item => {
        const documentId = 'urn:' + item.urn
        Autodesk.Viewing.Document.load(
            documentId,
            (documentUrn) => 
                {
                const defaultModel = documentUrn.getRoot().getDefaultGeometry();
    
                viewer.loadDocumentNode(documentUrn, defaultModel,
                    {
                        keepCurrentModels: true,
                        globalOffset: item.globalOffset,
                    });
                },
            () => 
                {
                console.log('Document NOT loaded');
                }
        );
    });
});
}

export const initdualViewer = async (urns) => {
    const response = await fetch('http://localhost:3000/auth/get-token')
    const data = await response.json()
    
    const access_token = data.data.access_token

    const options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2',
        accessToken: access_token
    };

const config = {
    extensions: ['Autodesk.DocumentBrowser', 'Autodesk.AEC.Minimap3DExtension'],
}

const viewerContainer = document.getElementById('twoViewer')
const viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config)

const documentId = 'urn:' + urns

Autodesk.Viewing.Initializer(options, () => {
    const starCode = viewer.start();

    if (starCode > 0) {
        console.error('Failed to create a Viewer: Error Code: ' + starCode)
    }

    Autodesk.Viewing.Document.load(
        documentId,
        (documentUrn) => {
            console.log(documentUrn.getRoot().search({type: 'geometry'})) //da  todas las  vistas

            const  viewablesName = documentUrn.getRoot().search({type: 'geometry'}).map(viewable => viewable.data.name)

            console.log(viewablesName)

            const defaultModel = documentUrn.getRoot().search({type: "geometry", name: viewablesName[2]})[0]

            viewer.loadDocumentNode(documentUrn, defaultModel)
        },
        () => {
            console.log('Document NOT loaded');
        }
    );
})
}