import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  faDollar,
  faEuro,
  faManatSign,
} from "@fortawesome/free-solid-svg-icons";

const Balance = () => {
  const currencies = [
    { symbol: "$", rate: 1, name: "USD", icon: faDollar },
    { symbol: "€", rate: 0.92, name: "EUR", icon: faEuro },
    { symbol: "₼", rate: 1.7, name: "AZN", icon: faManatSign },
  ];

  const [amountvalue, setAmountValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [showDropdDown, setShowDropDown] = useState(false);
  const [currencyoption, setCurrencyOption] = useState({
    symbol: "$",
    rate: 1,
    name: "USD",
    icon: "dollar",
  });

  const clickOutside = useRef(null);

  useEffect(() => {
    const closeOpenDropdown = (e) => {
      if (!clickOutside.current.contains(e.target)) {
        console.log("clicksidecurrent", clickOutside.current);
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", closeOpenDropdown);
  }, []);

  const addIncome = (type) => {
    const val = parseInt(amountvalue, 10);
    if (isNaN(val)) {
      toast("Zəhmət olmasa miqdari daxil edin");
      setAmountValue(0);
      return;
    }
    if (type === "income") {
      setTotal((prevtotalsum) => prevtotalsum + val);
      if (!amountvalue) {
        toast("Zəhmət olmasa miqdari daxil edin");
        return;
      }
      setHistoryList([
        ...historyList,
        {
          amountvalue: amountvalue,
          description: description,
          icon: type,
        },
      ]);
      setDescription("");
    } else {
      setTotal((prevtotalsum) => prevtotalsum - val);
      if (!amountvalue) {
        toast("Zəhmət olmasa miqdari daxil edin");
        return;
      }
      setHistoryList([
        ...historyList,
        {
          amountvalue: amountvalue,
          description: description,
          icon: type,
        },
      ]);
      setDescription("");
    }
    setAmountValue(0);
  };

  return (
    <section className="balance">
      <div className="allcontent">
        <div className="balanceheader">
          <i className="bi bi-credit-card-2-back-fill"></i>
          Balance
        </div>
        <div className="editmoney">
          <div ref={clickOutside} className="dropdown">
            <div
              onClick={() => {
                setShowDropDown(!showDropdDown);
              }}
              className="dropdown-button btn btn-primary"
            >
              {currencyoption.symbol}
            </div>
            {showDropdDown && (
              <div className="dropdown-content">
                {currencies.map((item, index) => (
                  <div
                    onClick={() => {
                      setCurrencyOption(item);
                      setShowDropDown(false);
                    }}
                    className="dropdown-item"
                  >
                    <FontAwesomeIcon
                      className="btn btn-primary"
                      icon={item.icon}
                    />
                    {item.name}
                    {item.symbol === currencyoption.symbol ? (
                      <i className="bi bi-check"></i>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="totalsum" />
          <p>{total * currencyoption.rate}</p>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      <div className="row">
        <div className="wholetextcontent">
          <div className="leftaction">
            <h5>Transactions</h5>
            <label>Amount</label>
            <input
              value={amountvalue}
              onChange={(e) => {
                setAmountValue(e.target.value);
              }}
              type="number"
              min="1"
            />
            <label>Description</label>
            <textarea
              cols="30"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="twobuttons">
              <button
                type="button"
                onClick={(e) => {
                  addIncome("income");
                }}
                className="btn btn-success"
              >
                <i className="bi bi-calculator-fill"></i>
                Income
              </button>
              <button
                type="button"
                onClick={() => addIncome("expense")}
                className="btn btn-danger"
              >
                <i className="bi bi-calculator-fill"></i>
                Expense
              </button>
            </div>
          </div>
          <div className="righthistory">
            <h5>History</h5>
            {historyList.map((item, index) => (
              <p>
                {item.icon === "income" ? (
                  <i className="bi bi-check-circle-fill"></i>
                ) : (
                  <i className="bi bi-x-circle"></i>
                )}
                {item.description} {parseInt(Math.abs(item.amountvalue), 10)}
                {currencyoption.symbol}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Balance;
