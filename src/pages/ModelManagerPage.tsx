import React, { useState } from 'react';
import {
  Cpu,
  Upload,
  Sliders,
  Database,
  ShieldAlert
} from 'lucide-react';
import { DUMMY_CLINICAL_MODELS } from '../data/dummyAudit';
import { ClinicalModelMeta } from '../types/clinical';

export const ModelManagerPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ClinicalModelMeta>(
    DUMMY_CLINICAL_MODELS[0]
  );
  const [thresholdSlider, setThresholdSlider] = useState<number>(75);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadFeedback(`Simulasi: Berkas "${fileName}" diterima di layer antarmuka. (Catatan: Pengunggahan ke storage cloud/server dinonaktifkan pada tahap prototype frontend)`);
      setTimeout(() => setUploadFeedback(null), 6000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Wajib: Mockup UI Prototype */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5 text-amber-950 shadow-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h3 className="font-bold uppercase tracking-wider text-amber-900">
              Mockup Antarmuka Pengujian (Prototype UI Only)
            </h3>
            <p className="leading-relaxed text-amber-900/90">
              Panel pengelola model ini merupakan <strong>representasi visual tata kelola AI/CDS</strong> untuk RS JIH Purwokerto. Fitur unggah dataset, pelatihan otomatis (*machine learning training*), dan komputasi inferensi belum aktif serta tidak terhubung ke kluster komputasi rumah sakit. Seluruh metrik akurasi di bawah ini adalah data simulasi fiktif untuk ilustrasi antarmuka.
            </p>
          </div>
        </div>
      </div>

      {/* Header Panel Model */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-jih-blue" />
            <h2 className="text-base sm:text-lg font-bold text-jih-navy">
              Panel Tata Kelola Model Pendukung Keputusan Klinis (CDSS)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rancangan antarmuka peninjauan versi algoritma klasifikasi risiko dan parameter ambang batas keputusan keperawatan.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-semibold text-slate-600">Model Aktif:</span>
          <select
            value={selectedModel.id}
            onChange={(e) => {
              const m = DUMMY_CLINICAL_MODELS.find((item) => item.id === e.target.value);
              if (m) setSelectedModel(m);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none"
          >
            {DUMMY_CLINICAL_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.version})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrik Performa Simulasi Model */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Akurasi Klasifikasi (Dummy)
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{selectedModel.accuracy}%</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
              [Ilustrasi]
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Uji evaluasi dataset sintetik triase 2.400 kasus fiktif
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Sensitivitas Kasus Kritis (Dummy)
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-700">{selectedModel.sensitivity}%</span>
            <span className="text-[10px] bg-rose-50 text-rose-800 px-1.5 py-0.2 rounded font-mono">
              [Ilustrasi]
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Kemampuan mendeteksi dini pasien berisiko henti jantung/sepsis
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Spesifisitas Kasus Stabil (Dummy)
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">{selectedModel.specificity}%</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
              [Ilustrasi]
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Mengurangi alarm palsu (false alarm fatigue) di ruang jaga
          </p>
        </div>
      </div>

      {/* Grid Konfigurasi & Simulasi Unggah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kolom Kiri: Simulasi Unggah Dataset Referensi */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-jih-blue" />
              <h3 className="text-sm font-bold text-slate-900">
                Simulasi Unggah Dataset Protokol Baru
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Area peragaan untuk meninjau alur pembaruan pustaka ambang batas nilai lab oleh tim IT klinis.
            </p>
          </div>

          {/* Area Drag and Drop Mockup */}
          <label className="border-2 border-dashed border-slate-300 hover:border-jih-blue rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
            <Database className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-800">
              Pilih Berkas Dataset (.CSV / .JSON)
            </span>
            <span className="text-[11px] text-slate-500 mt-1 max-w-xs">
              Uji coba pemilihan berkas lokal untuk melihat interaksi antarmuka prototipe.
            </span>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleSimulateUpload}
              className="hidden"
            />
          </label>

          {uploadFeedback && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-lg leading-relaxed">
              {uploadFeedback}
            </div>
          )}

          <div className="text-[11px] text-slate-500 bg-slate-100 rounded-lg p-3 leading-normal">
            <strong>Catatan Keamanan Data:</strong> Pada sistem produksi masa depan, seluruh dataset harus melalui proses de-identifikasi (anonymization) sesuai standar privasi data medis sebelum dilakukan evaluasi model.
          </div>
        </div>

        {/* Kolom Kanan: Simulasi Konfigurasi Ambang Batas Sensitivitas */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-jih-blue" />
              <h3 className="text-sm font-bold text-slate-900">
                Simulasi Penyetelan Ambang Eskalasi (Threshold Tuning)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulasi pengaturan tingkat kepekaan alarm klinis untuk memicu rekomendasi Level 3 dan Level 4.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
                <span>Ambang Sensitivitas Early Warning:</span>
                <span className="text-jih-blue font-bold">{thresholdSlider}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={thresholdSlider}
                onChange={(e) => setThresholdSlider(Number(e.target.value))}
                className="w-full accent-jih-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Lebih Selektif (50%)</span>
                <span>Seimbang (75%)</span>
                <span>Sangat Sensitif (95%)</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5 text-slate-700">
              <div className="font-bold text-slate-900">
                Efek Simulasi Ambang Terpilih ({thresholdSlider}%):
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                <li>
                  {thresholdSlider > 80
                    ? 'Sensitivitas tinggi: Cocok untuk ruang perawatan intensif/HCU untuk deteksi perburukan seketika.'
                    : 'Sensitivitas seimbang: Cocok untuk bangsal rawat inap umum untuk mencegah kepanikan dan alarm fatigue.'}
                </li>
                <li>
                  Perubahan ambang ini membutuhkan persetujuan resmi Tim Komite Medik RS JIH Purwokerto.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
