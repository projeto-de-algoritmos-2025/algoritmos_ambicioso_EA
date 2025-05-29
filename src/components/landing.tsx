/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";

const subjectNames = [
  "Cálculo 1",
  "APC",
  "Cálculo 2",
  "Física 1",
  "Física exp",
  "IAL",
  "PA",
  "PSPD",
  "Banco de Dados 1",
  "Banco de Dados 2",
  "EDA1",
  "EDA2",
  "Redes",
  "TED",
  "PED",
  "DIAC",
  "MDS",
  "Requisitos",
  "Métodos númericos",
  "Matemática Discreta 1",
  "Matemática Discreta 2",
  "EPS",
  "TPPE",
  "TEP",
  "Qualidade",
  "Testes",
  "GPEQ",
  "Embarcados",
  "Paradigmas",
  "Felicidade",
  "Compiladores",
  "Introd Eng",
]

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md"
  className?: string
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

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

  const generateRandomSubjects = (count: number) => {
    const randomSubjects: Subject[] = []

    for (let i = 0; i < count; i++) {
      const days = [2, 3, 4, 5, 6].slice(0, Math.floor(Math.random() * 3) + 1)
      const shifts = ["M", "T", "N"] as const
      const shift = shifts[Math.floor(Math.random() * shifts.length)]
      const maxSlots = { M: 5, T: 6, N: 4 }
      const numSlots = Math.floor(Math.random() * 3) + 1
      const startSlot = Math.floor(Math.random() * (maxSlots[shift] - numSlots + 1)) + 1
      const timeSlots = Array.from({ length: numSlots }, (_, j) => startSlot + j)

      randomSubjects.push({
        id: Date.now() + i,
        name: `${subjectNames[i % subjectNames.length]}`,
        code: `${days.join("")}${shift}${timeSlots.join("")}`,
        days,
        shift,
        timeSlots,
      })
    }

    setSubjects(randomSubjects)
  }

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

  function runAlgorithm() {
  }

  const resetAll = () => {
    setSubjects([]);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              Teste de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => generateRandomSubjects(10)} variant="secondary">
                10 Disciplinas
              </Button>
              <Button onClick={() => generateRandomSubjects(25)} variant="secondary">
                50 Disciplinas
              </Button>
              <Button onClick={() => generateRandomSubjects(50)} variant="secondary">
                100 Disciplinas
              </Button>
              <Button onClick={() => generateRandomSubjects(100)} variant="secondary">
                300 Disciplinas
              </Button>
              <Button onClick={resetAll} variant="danger">
                Resetar
              </Button>
            </div>
          </CardContent>
        </Card>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addSubject} className="w-full">
                  Adicionar
                </Button>
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
              <div className="grid gap-3 max-h-96 overflow-y-auto">
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
            <Button onClick={resetAll} variant="secondary">
              Resetar
            </Button>
            <Button onClick={runAlgorithm} className="gap-2 bg-green-600 hover:bg-green-700">
              Otimizar Grade
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
