import React, { useState } from "react";
import { requestLoan } from "../../api/loan/loan";
import { Input } from "../../components/Input/Input";
import { LoanStatus } from "../../utils/constants";
import "./Loan.scss";

const MAX_AMOUNT = 1000000000;

function LoanComponent() {
  const [taxId, setTaxId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [amount, setAmount] = useState("");
  const [loanStatus, setLoanStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taxId || !businessName || !amount || !validNumber(amount)) {
      alert("Please make sure to fill all the form");
      return;
    }
    const loan = await requestLoan(taxId, businessName, amount);
    const loanStatus = loan.status;
    setLoanStatus(loanStatus);

    let msg = "Your loan has been ";
    if (LoanStatus.UNDECIDED === loanStatus) {
      msg = `Your loan still in `;
    }
    msg += loanStatus;
    setMessage(msg);
    setTimeout(() => setLoanStatus(""), 5000);
  };

  const validNumber = (value) => {
    const reg = /^-?\d*$/.test(value);
    const number = parseInt(value);

    return !value.length || (reg && number > 0 && number <= MAX_AMOUNT);
  };

  const handleAmount = (e) => {
    const value = e.target.value;

    if (validNumber(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="request-loan">
      <form className="loan-form" onSubmit={handleSubmit}>
        <h3>Request Loan</h3>
        <div className="form-input">
          <label>Tax ID:</label>
          <Input
            type="text"
            value={taxId}
            setValue={(e) => setTaxId(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>Business name: </label>
          <Input
            type="text"
            value={businessName}
            setValue={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>Amount: </label>
          <Input type="text" value={amount} setValue={handleAmount} />
        </div>
        <button type="submit">Send</button>
      </form>
      {loanStatus && (
        <div className={`loan-status ${loanStatus}`}>{message}</div>
      )}
    </div>
  );
}

export default LoanComponent;
