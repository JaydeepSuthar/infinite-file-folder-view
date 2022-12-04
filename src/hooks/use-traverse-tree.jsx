const useTraverseTree = () => {
	const insertNode = (tree, folderId, item, isFolder) => {
		if (tree.id === folderId && tree.isFolder) {
			tree.items.unshift({
				id: new Date().valueOf(),
				name: item,
				isFolder,
				items: [],
			});
			return tree;
		}

		let latestNode = [];
		latestNode = tree.items.map((itemObj) => {
			return insertNode(itemObj, folderId, item, isFolder);
		});

		return { ...tree, items: latestNode };
	};

	const removeNode = (tree, folderId) => {
		console.log(tree, folderId);
		if (tree.id === folderId) {
			tree.items = [];

			return tree;
		}

		let latestNode = [];
		latestNode = tree.items.map((itemObj) => {
			return removeNode(itemObj, folderId);
		});

		return { ...tree, items: latestNode };
	};

	return { insertNode, removeNode };
};

export default useTraverseTree;
