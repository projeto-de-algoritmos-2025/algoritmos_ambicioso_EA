/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";

const Card = ({ children, className = "" }: { children: any; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: any }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

const CardTitle = ({ children, className = "" }: { children: any; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

const CardContent = ({ children }: { children: any }) => <div className="px-6 py-4">{children}</div>;

interface Subject {
  id: number;
  name: string;
  code: string;
  days: number[]
  shift: "M" | "T" | "N"
  timeSlots: number[]
}
export default function Landing() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState("");  

  const addSubject = () => {
    if (!newSubjectName.trim() || !newSubjectCode.trim()) {
      alert("Nome e código são obrigatórios");
      return;
    }
    const parsed = parseSigaaCode(newSubjectCode.trim())
    if (!parsed) {
      alert("Código inválido. Use o formato SIGAA (ex: 25T23, 246M34)")
      return
    }
    const newSubject: Subject = {
      id: Date.now(),
      name: newSubjectName.trim(),
      code: newSubjectCode.trim(), 
      days: parsed.days,
      shift: parsed.shift,
      timeSlots: parsed.timeSlots,
    };

    setSubjects((prev) => [...prev, newSubject]);
    setNewSubjectName("");
    setNewSubjectCode("");
  };

  const parseSigaaCode = (code: string): { days: number[]; shift: "M" | "T" | "N"; timeSlots: number[] } | null => {
    try {
      const regex = /^([2-6]+)([MTN])([1-6]+)$/
      const match = code.match(regex)

      if (!match) return null

      const [, daysStr, shift, timeSlotsStr] = match

      const days = daysStr.split("").map((d) => Number.parseInt(d))
      const timeSlots = timeSlotsStr.split("").map((t) => Number.parseInt(t))

      if (days.some((d) => d < 2 || d > 6)) return null

      const maxSlots = { M: 5, T: 6, N: 4 }
      if (timeSlots.some((t) => t < 1 || t > maxSlots[shift as keyof typeof maxSlots])) return null

      return { days, shift: shift as "M" | "T" | "N", timeSlots }
    } catch {
      return null
    }
  }
  
  function runAlgorithm(){

  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Adicionar Disciplina</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject-name">
                  Nome da Disciplina
                </label>
                <input
                  id="subject-name"
                  placeholder="Ex: Cálculo 1"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject-code">
                  Código SIGAA
                </label>
                <input
                  id="subject-code"
                  placeholder="Ex: 25T23"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="flex items-end">
                <button onClick={addSubject} className="w-full">
                  Adicionar
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        {subjects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Disciplinas Cadastradas ({subjects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {subjects.map((subject: Subject, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md 
                            border-gray-200 hover:border-gray-300"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{subject.name}</h3>
                          <p className="text-xs text-gray-500">Código: {subject.code}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={runAlgorithm} className="gap-2 bg-green-600 hover:bg-green-700">
              Otimizar Grade
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
