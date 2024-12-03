
export const initViewer = async () => {
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

    const viewerContainer = document.getElementById('myViewer')
    const viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config)

    const urn = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXNkYXNrZGphc25kbGdmc2ZzZGdzYXNkbGFzZGthc2Rtdm9tdHIvcmFjYmFzaWNzYW1wbGVwcm9qZWN0LnJ2dA"
    const documentId = 'urn:' + urn

    Autodesk.Viewing.Initializer(options, () => {
        const starCode = viewer.start();

        if (starCode > 0) {
            console.error('Failed to create a Viewer: Error Code: ' + starCode)
        }

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