import { motion } from 'framer-motion';
import { Download, Filter, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';



export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

useEffect(() => {

  const loadDocuments = async () => {

    try {

      const response = await api.get("/documents");

      setDocuments(response.data.documents);

    } catch (error) {

      console.log(error);

    }

  };

  loadDocuments();

}, []);
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Document Registry</p>
          <h2 className="text-3xl font-semibold text-white">Enterprise document inventory</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300"><Filter className="h-4 w-4" /> Filters</button>
          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"><Download className="h-4 w-4" /> Export CSV</button>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input className="bg-transparent outline-none" placeholder="Search documents" />
        </label>
        <div className="text-sm text-slate-400">
  Showing {documents.length} documents
</div>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-950/70 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Document Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Upload Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Blockchain</th>
              <th className="px-4 py-3 text-left">Verification</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-200">
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-slate-800/50">
                <td className="px-4 py-3 font-medium">{doc.filename}</td>
                <td className="px-4 py-3">Uploaded File</td>
                <td className="px-4 py-3">{doc.upload_date}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-blue-600/15 px-2 py-1 text-blue-300">{doc.status}</span></td>
                <td className="px-4 py-3">
  Block #{doc.block_number}
</td>
                <td className="px-4 py-3">
  {doc.status}
</td>
                <td className="px-4 py-3"><button className="rounded-full p-2 hover:bg-slate-800"><ShieldCheck className="h-4 w-4 text-blue-400" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Page 1 of 6</span>
        <div className="flex gap-2">
          {['1', '2', '3', '4'].map((page) => <button key={page} className="rounded-xl border border-slate-700 px-3 py-2">{page}</button>)}
        </div>
      </div>
    </div>
  );
}
