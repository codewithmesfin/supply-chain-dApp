import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import Button from "./components/button";
import { ethers } from "ethers";
import SupplyChain from "SupplyChain.json";
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const contractABI = SupplyChain.abi

type Item = {
  id: number;
  name: string;
  status: number;
};


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");

  async function orderItem() {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider();
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.orderItem(name);
      await tx.wait();
      loadItems();
      setName("");
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelItem(id: number) {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider();
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.cancelItem(id);
      await tx.wait();
      loadItems();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadItems() {
    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const count = await contract.getItemCount();
      const items = [];
      for (let i = 0; i < count; i++) {
        const item = await contract.getItem(i);
        items.push(item);
      }
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      loadItems();
    }
  }, []);


  function getStatusText(status: number): string {
    switch (status) {
      case 0:
        return "Ordered";
      case 1:
        return "Shipped";
      case 2:
        return "Delivered";
      case 3:
        return "Cancelled";
      default:
        return "";
    }
  }


  return (
    <>
      <div className="h-screen w-full md:max-w-2xl mx-auto flex items-center">
        <div className="w-full rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1 className="font-bold py-4 text-xl text-center">Decentralised supply chain tracking application</h1>
            <div className="py-10 flex justify-between items-center space-x-3">
              <InputField
                value={name}
                onchange={(e: string) => setName(e)}
              />
              <Button title="Order" onClick={orderItem}
                />
            </div>
            <div className="mt-4 list-decimal">
                {items.length<1?<p className="pb-5 text-center text-red-600">No Items</p>
                :items.map((item,i) => (
                  <div key={i} className={`pl-5 flex justify-between py-3 ${i<items.length-1?'border-b':''}`}>
                   <p>
                   <span> {item.name}</span> - 
                   <span className="font-semibold"> {getStatusText(item.status)}</span>
                   </p>
                    {item.status === 0 && (
                      <Button
                        title="Cancel"
                        bgColor="bg-red-600"
                        onClick={() => cancelItem(item.id)} />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
