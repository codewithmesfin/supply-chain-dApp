import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import Button from "./components/button";
import { ethers } from "ethers";
import SupplyChain from "SupplyChain.json";
const contractAddress = " 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
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
            <div className="font-bold text-xl mb-2">Decentralised supply chain tracking application</div>
            <div className="py-10">
              <InputField
                value={name}
                onchange={(e: string) => setName(e)}
              />
              <div className="py-2">
                <Button title="Order" onClick={orderItem}
                />
              </div>
            </div>
            <div>
              <ul className="mt-4 list-decimal">
                {items.map((item) => (
                  <li key={item.id} className="pl-5">
                    {item.name} - {getStatusText(item.status)}
                    {item.status === 0 && (
                      <Button
                        title="Cancel"
                        bgColor="bg-red-600"
                        onClick={() => cancelItem(item.id)} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
