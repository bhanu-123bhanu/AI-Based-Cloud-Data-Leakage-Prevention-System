import { motion } from 'framer-motion';
import { CheckCircle2, FileUp, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { useState } from 'react';
import { uploadDocument } from '../services/api';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  

  const handleFiles = (files) => {
  const selected = files[0];

  if (!selected) return;

  setFile(selected);
  setStatus("idle");
  setProgress(0);
};
const handleUpload = async () => {

  if (!file) {
    alert("Please select a file first");
    return;
  }

  try {

    setStatus("uploading");
    setProgress(20);

    await uploadDocument({ file });

    setProgress(100);
    setStatus("success");

    alert("File Uploaded Successfully");

  } catch (error) {

  setStatus("idle");
  setProgress(0);

  alert("Upload Failed");

  console.log(error);

}
};

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
      <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Secure Upload</p>
          <h2 className="text-3xl font-semibold text-white">Upload and protect enterprise documents</h2>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-600/10 px-3 py-2 text-sm text-blue-300">AI classification enabled</div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
          className={`rounded-[2rem] border-2 border-dashed p-8 text-center transition ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-950/40'}`}
        >
          <FileUp className="mx-auto h-12 w-12 text-blue-400" />
          <h3 className="mt-4 text-xl font-semibold text-white">Drag and drop documents</h3>
          <p className="mt-2 text-sm text-slate-400">Supported files: PDF, DOCX, TXT, CSV</p>
          <label className="mt-6 inline-flex cursor-pointer rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">
            Browse Files
            <input type="file" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-slate-800 bg-slate-950/50 p-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Upload Summary</h3>
              {status === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : status === 'uploading' ? <Loader2 className="h-5 w-5 animate-spin text-blue-400" /> : <XCircle className="h-5 w-5 text-slate-500" />}
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-slate-400">{file ? file.name : 'No file selected'}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4 text-blue-400" /> AI Classification Status</div>
            <p className="mt-2 text-sm text-slate-400">Classified as Financial Report · Sensitive</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4 text-blue-400" /> Encryption Status</div>
            <p className="mt-2 text-sm text-slate-400">AES-256 encryption pending approval</p>
          </div>

          <div className="flex gap-3">
            <button
  onClick={handleUpload}
  className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500"
>
  Upload
</button>
            <button className="flex-1 rounded-2xl border border-slate-700 px-4 py-3 font-semibold text-slate-300">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
