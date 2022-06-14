import React, { useState, useEffect } from "react";
import { SimpleDropDown } from "../../../../components/simpleDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Download from "../../../../assets/svg/download.svg";
import "./index.less";

export const SettingsPage = () => {
	const [show, setShow] = useState(true);
	const [modal, setModal] = useState(false);
	const [checkbox, setCheckbox] = useState(true);
	const [card, setCard] = useState(false);
	const mainSettings = [
		{ name: "AE Qualified" },
		{ name: "Business Requirements Identified" },
		{ name: "Proof of Concept(POC)" },
		{ name: "Proposal/Price Presented" },
		{ name: "Negotiation/Procurement/Legal" },
		{ name: "Finalizing Closure" },
		{ name: "Finance Review" },
		{ name: "Closed Won" },
		{ name: "Closed Lost" },
	];
	const dataset = [
		"Best Case",
		"In Pipeline",
		"Commit",
		"Closed Won",
		"Closed Lost",
	];
	const hideSettings = () => {
		if (show && checkbox) {
			setModal(true);
		}
		if (!show && !checkbox && !modal) {
			setShow(true);
			setCheckbox(true);
		}
	};
	return (
		<div className="page">
			<div className="titleWrapper">
				<h2 className={`title ${show ? "blue" : ""}`}>
					Enable Clientell Forecasting
				</h2>
				{/* <label className="toggle-control">
					<input type="checkbox" checked  />
					<span className="control"></span>
				</label> */}
				<div className="labelWrapper">
					<label className="switch">
						<input
							type="checkbox"
							checked={checkbox}
							onChange={hideSettings}
							// onChange={(value) => console.log(value)}
						/>
						<span className="slider round"></span>
					</label>
					{modal && (
						<div className="confirmModal">
							<p>Do you want to turn off Forecasting?</p>
							<div className="btn-wrapper">
								<button
									className="off"
									onClick={() => {
										setModal(false);
										setCheckbox(false);
										setShow(false);
									}}
								>
									Turn Off
								</button>
								<button
									className="cancel"
									onClick={() => {
										setModal(false);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="rightSide">
					<p
						className="top"
						onClick={() => {
							setCard(!card);
						}}
					>
						View Clientell Integration Details
						<FontAwesomeIcon icon={faChevronRight} className="icon" />
					</p>
					<p className="bottom">
						<img src={Download} /> Download Integration Instruction
					</p>
					{card && (
						<div className="consumerCard">
							<h2>Consumer Key & Consumer secret</h2>
							<p>
								Consumer Key: <b>3MV</b>{" "}
							</p>
							<div className="dashed"></div>
							<p>
								Consumer Secret:{" "}
								<span className="orange">Click to Reveal </span>
							</p>
							<div className="dashed"></div>
							<p>Host Name: Zayn Kregs</p>
							<div className="btns">
								<button className="details">
									Get Detailed Intructions{" "}
									<FontAwesomeIcon icon={faChevronRight} className="icon" />
								</button>
								<button className="edit">
									Edit
									<FontAwesomeIcon icon={faChevronRight} className="icon" />
								</button>
							</div>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className="closeIcon"
								onClick={() => {
									setCard(!card);
								}}
							/>
						</div>
					)}
				</div>
			</div>
			{show && (
				<div className="hideOrNot">
					<p className="subTitle">Map Opportunity stage to forecast category</p>
					<div className="table">
						<div className="tableHeader">
							<p>Stage</p>
							<p>Forecast category</p>
						</div>
						<div className="mainSettings">
							{mainSettings.map((item, index) => {
								return (
									<div className="tableItem" key={index}>
										<p className="index">{index + 1}</p>
										<p>{item.name}</p>
										<div className="dropdownarea">
											<SimpleDropDown
												data={{ defaultVal: "Best Case", dataset: dataset }}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<p className="subTitle second">Opportunity Won</p>
					<div className="secondTable">
						<p>Select Deals that signifies Opportunity Won</p>
						<div className="dropdownarea">
							<SimpleDropDown
								data={{ defaultVal: "Closed Down", dataset: dataset }}
							/>
						</div>
					</div>
					<p className="subTitle second">Opportunity Lost</p>
					<div className="secondTable">
						<p>Select Deals that signifies Opportunity Lost</p>
						<div className="dropdownarea">
							<SimpleDropDown
								data={{ defaultVal: "Closed Down", dataset: dataset }}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
