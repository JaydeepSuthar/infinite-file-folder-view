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
		if (tree.id === folderId) {
			return null;
		}

		let newTree = [];
		newTree = tree.items.filter((item) => {
			if (item.id !== folderId) return item;
		});

		return { ...tree, items: newTree };
	};

	return { insertNode, removeNode };
};

export default useTraverseTree;
