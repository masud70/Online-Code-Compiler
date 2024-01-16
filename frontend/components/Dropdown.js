"use client";
import { Dropdown } from "keep-react";
import { useState } from "react";

export const DropdownComponent = ({ label, action }) => {
	const [selected, setSelected] = useState(null);
	const clickAction = (value) => {
		setSelected(value);
		action(value);
	};

	return (
		<Dropdown
			label={selected ? selected : label}
			size="sm"
			type="primary"
			dismissOnClick={true}
			className="w-[170px] flex justify-between"
		>
			<Dropdown.Item onClick={() => clickAction("C")}>C</Dropdown.Item>
			<Dropdown.Item onClick={() => clickAction("CPP")}>
				CPP
			</Dropdown.Item>
			<Dropdown.Item onClick={() => clickAction("JAVA")}>
				JAVA
			</Dropdown.Item>
			<Dropdown.Item onClick={() => clickAction("PYTHON")}>
				PYTHON
			</Dropdown.Item>
		</Dropdown>
	);
};
