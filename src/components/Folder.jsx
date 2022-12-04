import { useState } from "react";

const Folder = ({ handleInsertNode, handleRemoveNode, explorer }) => {
	const [expand, setExpand] = useState(false);

	const [showInput, setShowInput] = useState({
		isFolder: null,
		visible: false,
	});

	const handleAdd = (event, isFolder = false) => {
		event.stopPropagation();

		setShowInput({ visible: true, isFolder });
		setExpand(true);
	};

	const onAdd = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

			setShowInput({ ...showInput, visible: false });
		}
	};

	const onRemove = (e) => {
		handleRemoveNode(explorer.id);
	};

	if (explorer.isFolder)
		return (
			<div className="node" style={{ marginTop: "10px" }}>
				<div className="folder" onClick={(_) => setExpand(!expand)}>
					<span>📁 {explorer.name}</span>

					<div>
						<button onClick={(e) => handleAdd(e, true)}>
							Folder +
						</button>
						<button onClick={(e) => handleAdd(e)}>File +</button>
						<button onClick={(e) => onRemove(e)}>Folder -</button>
					</div>
				</div>

				<div
					style={{
						display: expand ? "block" : "none",
						paddingLeft: "25px",
					}}
				>
					{showInput.visible ? (
						<div className="input__container">
							<span>{showInput.isFolder ? "📁" : "📄"}</span>
							<input
								className="input"
								type="text"
								autoFocus
								onKeyDown={onAdd}
								onBlur={(e) => {
									setShowInput({
										...showInput,
										visible: false,
									});
								}}
							/>
						</div>
					) : null}

					{explorer.items.map((item) => {
						return (
							<div>
								<Folder
									handleRemoveNode={handleRemoveNode}
									handleInsertNode={handleInsertNode}
									explorer={item}
									key={item.id}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);

	return <span className="file">📄 {explorer.name}</span>;
};

export default Folder;
