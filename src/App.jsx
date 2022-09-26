import { useEffect, useState } from "react";
import "./App.css";
import "rc-tree/assets/index.css";
import "@contentstack/ui-extensions-sdk/dist/ui-extension-sdk.min.css"
import { AuthType, createClient } from "webdav";
import Tree from "rc-tree";
import contentstack from '@contentstack/ui-extensions-sdk'

let extension;
contentstack.init().then(contentstackExtension => extension = contentstackExtension)
const treeData = [
  {
    key: "0-0",
    title: "dam",
    selectable: false,
    children: [
      {
        key: "0-0-0",
        title: "2021",
        selectable: false,
        children: [{ key: "0-0-0-0", title: "2021-test.png" }],
      },
      {
        key: "0-0-1",
        title: "2022",
        selectable: false,
        children: [
          {
            key: "0-0-1-0",
            title: "upright-bba-with-shadow",
            selectable: false,
            children: [
              {
                key: "0-0-1-0-0",
                title: "m226658-0001.png",
                url: 'https://s.yimg.com/aah/movadobaby/rolex-cosmograph-daytona-116508-367.jpg'
              },
            ],
          },
          { key: "0-0-1-1", title: "m226658-0001.png" },
          { key: "0-0-1-2", title: "m226658-0002.png" },
          { key: "0-0-1-3", title: "m226658-0003.png" },
          { key: "0-0-1-4", title: "m226658-0004.png" },
          { key: "0-0-1-5", title: "m226658-0005.png" },
          { key: "0-0-1-6", title: "m226658-0006.png" },
          { key: "0-0-1-7", title: "m226658-0007.png" },

        ],
      },
    ],
  },
];

function App() {
  const [asset, setAsset] = useState([]);
  const [node, setNode] = useState();

  /*
  useEffect(() => {

      const client = createClient(
        "http://127.0.0.1:8080",
        {
            authType: AuthType.Digest,
            username: "admin",
            password: "admin"
        }
      );

      const fetchData = async () => {
        const directoryItems = await client.getDirectoryContents("/");
      }
    
      fetchData()
        .catch(console.error);

  }, [])
  */

  useEffect(() => {
    const fieldValue = extension?.field.getData();
    console.log("Extension created", extension)
    if(fieldValue) {
      console.log("Setting default", fieldValue)
      setAsset([fieldValue])
    }

  }, []);

  const onSelect = (_, { node }) => {
    console.log("Selected Node", {
      node
    })
    setAsset([node.key])
    setNode(node)
    extension?.field.setData(node.key);      
    extension?.window.updateHeight();

  }

  return (
    <div className="App">
      <div >
        <Tree defaultExpandAll treeData={treeData} onSelect={onSelect} selectedKeys={asset} />
      </div>
      {node && node.url && (<div className='preview'>
        <img src={node.url}/>
      </div>)}
      
    </div>
  );
}

export default App;
