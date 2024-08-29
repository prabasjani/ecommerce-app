import React, { useState } from "react";

const PaymentGateway = () => {
  const [bankImg, setBankImg] = useState("");
  const [AccName, setAccName] = useState("");
  const [cardNumber, setCardNumber] = useState();
  const [expDate, setExpDate] = useState("");
  let imageURL = "";
  let bankName = "";
  if (bankImg === "axis") {
    imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/AXISBank_Logo.svg/220px-AXISBank_Logo.svg.png";
    bankName = "axis bank";
  } else if (bankImg === "hdfc") {
    imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/220px-HDFC_Bank_Logo.svg.png";
    bankName = "hdfc bank";
  } else if (bankImg === "icici") {
    imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/304px-ICICI_Bank_Logo.svg.png";
    bankName = "icici bank";
  } else if (bankImg === "sbi") {
    imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/State_Bank_of_India.svg/175px-State_Bank_of_India.svg.png";
    bankName = "sbi";
  } else if (bankImg === "indian") {
    imageURL =
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Indian_Bank_logo.svg/250px-Indian_Bank_logo.svg.png";
    bankName = "indian bank";
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 h-1/2 bg-white rounded-xl p-10 flex items-center justify-center gap-24">
        <div className="">
          <div className="w-[400px] border rounded-xl h-[250px] bg-slate-900 p-8 flex flex-col justify-between">
            <img src={imageURL} alt="" className="w-[150px] " />
            <div className="text-white flex justify-between items-center">
              <div className="">
                <h4 className="mb-3 font-bold tracking-widest text-xl">
                  {cardNumber}
                </h4>
                <div className="flex items-center gap-8">
                  <h4 className="font-bold">{AccName.toUpperCase()}</h4>
                  <h5 className="font-semibold">{expDate}</h5>
                </div>
              </div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/220px-RuPay.svg.png"
                alt=""
                className="w-[125px] h-[50px]"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="flex items-center gap-10">
              <select
                onClick={(e) => setBankImg(e.target.value)}
                className="px-5 py-3"
              >
                <option value="">Select Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">SBI Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="indian">Indian Bank</option>
              </select>
              <h4 className="text-xl font-bold">{bankName.toUpperCase()}</h4>
            </div>
            <form className="my-10 flex flex-col gap-5">
              <input
                type="text"
                placeholder="Account holder name"
                className=" focus:outline-none p-3 rounded-md border border-slate-500"
                value={AccName}
                onChange={(e) => setAccName(e.target.value)}
              />
              <input
                type="number"
                placeholder="XXXX"
                minLength={4}
                className="w-full focus:outline-none border border-slate-500 p-3 rounded-md"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full  focus:outline-none border border-slate-500 p-3 rounded-md"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
