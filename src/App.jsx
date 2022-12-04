import { useState } from "react";
import Folder from "./components/Folder";

import explorer from "./data/explorer";
import useTraverseTree from "./hooks/use-traverse-tree";

const App = () => {
	const [fileStructure, setFileStructure] = useState(explorer);

	const { insertNode, removeNode } = useTraverseTree();

	const handleInsertNode = (folderId, item, isFolder) => {
		const finalTree = insertNode(fileStructure, folderId, item, isFolder);

		setFileStructure(finalTree);
	};

	const handleRemoveNode = (folderId) => {
		const finalTree = removeNode(fileStructure, folderId);

		setFileStructure(finalTree);
	};

	return (
		<>
			<Folder
				handleInsertNode={handleInsertNode}
				explorer={fileStructure}
				handleRemoveNode={handleRemoveNode}
			/>
		</>
	);
};

export default App;
