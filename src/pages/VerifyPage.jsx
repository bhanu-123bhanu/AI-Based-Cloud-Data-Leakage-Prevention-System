import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, ShieldCheck, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerifyPage() {
  const [file, setFile] = useState(null);
const [hash, setHash] = useState("");
const [result, setResult] = useState(null);
const verifyDocument = async () => {

  if (!file) {
    alert("Please select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {

    const response = await api.post("/verify", formData);

    setResult(response.data.integrity);
    setHash(response.data.current_hash);

  } catch (error) {

    console.log(error);
    alert("Verification Failed");

  }

};

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Document Verification</p>
          <h2 className="text-3xl font-semibold text-white">Validate file integrity against blockchain</h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/40 p-5">
            <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-4 py-6 text-slate-300">
              <Upload className="h-5 w-5 text-blue-400" /> Upload document for verification
              <input
  type="file"
  className="hidden"
  onChange={(e) => setFile(e.target.files[0])}
/>
            </label>
            <button
  onClick={verifyDocument}
  className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white"
>
  Verify Document
</button>
          </div>
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/40 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4 text-blue-400" /> Blockchain Verification</div>
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-emerald-400"><CheckCircle2 className="h-5 w-5" /> {result}</div>
              <p className="mt-3 text-sm text-slate-400">Document fingerprint matched with the distributed ledger entry.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">SHA-256 Hash</p>
              <p className="mt-2 break-all font-mono text-sm text-white">{hash}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <h3 className="text-xl font-semibold text-white">Verification Timeline</h3>
        <div className="mt-4 space-y-3">
          {[
            ['Upload Received', 'Document uploaded and hash generated'],
            ['Ledger Check', 'Matching blockchain record found'],
            ['Integrity Approved', 'No tampering detected'],
          ].map(([title, body], index) => (
            <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="rounded-full bg-blue-600/15 p-2 text-blue-400"><FileCheck2 className="h-4 w-4" /></div>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-slate-400">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
