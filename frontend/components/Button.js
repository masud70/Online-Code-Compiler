"use client";
import { Button } from "keep-react";
import { Play } from "phosphor-react";

export const ButtonComponent = ({ label, action }) => {
	return (
		<>
			<Button className="h-11" onClick={() => action()} type="primary" size="md">
				{label}
				<span className="pl-2">
					<Play size={22} />
				</span>
			</Button>
		</>
	);
};
