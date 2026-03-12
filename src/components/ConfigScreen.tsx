import React, { useState } from "react";
import { Settings, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AppConfig } from "../types";

interface ConfigScreenProps {
  onNext: (config: AppConfig) => void;
  onBack: () => void;
}

export function ConfigScreen({ onNext, onBack }: ConfigScreenProps) {
  const [config, setConfig] = useState<AppConfig>({
    hoopSize: "5x7",
    outputFormat: ".PES",
    stitchDensity: "Standard",
    projectType: "3d-project",
    material: "Cotton",
    appliqueMethod: "trim-in-place",
    isMultiPosition: false,
    projectWidth: 0,
    projectHeight: 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
          <Settings size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Project Configuration
          </h2>
          <p className="text-slate-500 text-sm">
            Set up your embroidery machine parameters.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Project Type
          </label>
          <select
            value={config.projectType}
            onChange={(e) =>
              setConfig({ ...config, projectType: e.target.value })
            }
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value="3d-project">3D Sewing Project (Bag, Pouch, etc.)</option>
            <option value="quiet-book">Quiet Book / Educational Activity Page</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Main Material
          </label>
          <select
            value={config.material}
            onChange={(e) => setConfig({ ...config, material: e.target.value })}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value="Cotton">Cotton</option>
            <option value="Felt">Felt</option>
            <option value="Denim">Denim</option>
            <option value="Polyester">Polyester</option>
            <option value="Canvas">Canvas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Appliqué Method
          </label>
          <select
            value={config.appliqueMethod}
            onChange={(e) =>
              setConfig({ ...config, appliqueMethod: e.target.value as 'pre-cut' | 'trim-in-place' })
            }
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value="trim-in-place">Cut during embroidery (Trim-in-place)</option>
            <option value="pre-cut">Pre-cut fabrics (e.g. Cricut/ScanNCut)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Hoop Size
          </label>
          <select
            value={config.hoopSize}
            onChange={(e) => setConfig({ ...config, hoopSize: e.target.value })}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value="4x4">4" x 4" (100x100mm)</option>
            <option value="5x7">5" x 7" (130x180mm)</option>
            <option value="6x10">6" x 10" (160x260mm)</option>
            <option value="8x12">8" x 12" (200x300mm)</option>
          </select>

          <div className="mt-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.isMultiPosition}
                onChange={(e) => setConfig({ ...config, isMultiPosition: e.target.checked })}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
              />
              <span className="text-sm font-medium text-slate-700">
                Use multi-position embroidery hoop
              </span>
            </label>
          </div>

          {config.isMultiPosition && (
            <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Width (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={config.projectWidth || ''}
                  onChange={(e) => setConfig({ ...config, projectWidth: parseFloat(e.target.value) || 0 })}
                  placeholder="e.g. 30"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Final Height (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={config.projectHeight || ''}
                  onChange={(e) => setConfig({ ...config, projectHeight: parseFloat(e.target.value) || 0 })}
                  placeholder="e.g. 20"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Output Format
          </label>
          <select
            value={config.outputFormat}
            onChange={(e) =>
              setConfig({ ...config, outputFormat: e.target.value })
            }
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value=".PES">.PES (Brother/Babylock)</option>
            <option value=".EMB">.EMB (Wilcom)</option>
            <option value=".EXP">.EXP (Melco/Bernina)</option>
            <option value=".DST">.DST (Tajima)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stitch Density
          </label>
          <select
            value={config.stitchDensity}
            onChange={(e) =>
              setConfig({ ...config, stitchDensity: e.target.value })
            }
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
          >
            <option value="Light">Light (For delicate fabrics)</option>
            <option value="Standard">Standard (Cotton, Canvas)</option>
            <option value="Dense">Dense (Towels, Fleece)</option>
          </select>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <button
          onClick={() => onNext(config)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <span>Start Processing</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
