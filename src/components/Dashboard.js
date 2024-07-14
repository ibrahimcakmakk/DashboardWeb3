// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FaWallet, FaBalanceScale, FaHashtag, FaCalendar, FaLayerGroup, FaCube, FaChartBar } from 'react-icons/fa';
import { MdSwapVert } from 'react-icons/md';
import { SiSolana } from 'react-icons/si';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [blockhash, setBlockhash] = useState(null);
  const [epochInfo, setEpochInfo] = useState({});
  const [walletAddress, setWalletAddress] = useState(null);

  const connection = new Connection(clusterApiUrl('devnet'));

  const fetchBalance = async (publicKey) => {
    const balance = await connection.getBalance(publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  const fetchBlockhash = async () => {
    const { blockhash } = await connection.getRecentBlockhash();
    setBlockhash(blockhash);
  };

  const fetchEpochInfo = async () => {
    const epochInfo = await connection.getEpochInfo();
    setEpochInfo(epochInfo);
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      try {
        const response = await solana.connect();
        const publicKey = response.publicKey;
        setWalletAddress(publicKey.toString());
        fetchBalance(publicKey);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  useEffect(() => {
    fetchBlockhash();
    fetchEpochInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Solana Dashboard</h1>
        <button 
          onClick={connectWallet} 
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 mb-6"
        >
          Connect Wallet
        </button>
        <div className="text-center mb-6">
          <p className="text-gray-800 text-lg"><strong>Wallet Address:</strong> {walletAddress || 'Not Connected'}</p>
          <p className="text-gray-800 text-lg"><strong>Balance:</strong> {balance !== null ? `${balance} SOL` : 'N/A'}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaHashtag className="text-blue-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Blockhash:</strong></p>
              <p className="text-gray-600">{blockhash ? blockhash.slice(0, 10) : 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaCalendar className="text-green-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Epoch:</strong></p>
              <p className="text-gray-600">{epochInfo.epoch || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaLayerGroup className="text-red-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Slot Index:</strong></p>
              <p className="text-gray-600">{epochInfo.slotIndex || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaCube className="text-purple-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Slots in Epoch:</strong></p>
              <p className="text-gray-600">{epochInfo.slotsInEpoch || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaChartBar className="text-yellow-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Absolute Slot:</strong></p>
              <p className="text-gray-600">{epochInfo.absoluteSlot || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaBalanceScale className="text-indigo-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Block Height:</strong></p>
              <p className="text-gray-600">{epochInfo.blockHeight || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <FaWallet className="text-pink-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Transaction Count:</strong></p>
              <p className="text-gray-600">{epochInfo.transactionCount || 'N/A'}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <SiSolana className="text-teal-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Network:</strong></p>
              <p className="text-gray-600">Devnet</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
            <MdSwapVert className="text-orange-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-800 text-lg"><strong>Swaps:</strong></p>
              <p className="text-gray-600">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
