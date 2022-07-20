import React, { Fragment } from "react";
import "./StepsForOrder.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const StepsForOrder = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    marginTop: "20px",
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep} alternativeLabel style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
             style={{
              color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.649)",}}
            icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default StepsForOrder;
