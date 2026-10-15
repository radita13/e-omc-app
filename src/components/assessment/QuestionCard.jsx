"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuestionCard({
  question,
  step = 1,
  savedAnswer,
  onSubmitAnswer,
  onPrev,
  canGoBack = false,
  isLoading,
  onCancel,
}) {
  const [selectedValue, setSelectedValue] = useState(
    savedAnswer?.optionId ? savedAnswer.optionId.toString() : null
  );
  const [selectedValues, setSelectedValues] = useState(
    savedAnswer?.optionIds || []
  );

  const handleCheckboxChange = (optionId) => {
    setSelectedValues((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    let answerData = { questionId: question.id };

    if (question.questionType === "radio") {
      if (!selectedValue) return;
      answerData.optionId = selectedValue;
    } else if (question.questionType === "checkbox") {
      if (selectedValues.length === 0) return;
      answerData.optionIds = selectedValues;
    }

    onSubmitAnswer(answerData);
    setSelectedValue(null);
    setSelectedValues([]);
  };

  const isSubmitDisabled =
    isLoading ||
    (question.questionType === "radio" && !selectedValue) ||
    (question.questionType === "checkbox" && selectedValues.length === 0);

  return (
    <Card className="w-full shadow-lg border gap-0 pb-0 border-gray-100 overflow-hidden bg-white">
      {/* Top progress bar */}
      <div className="h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-cyan-600 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(15, step * 20))}%` }}
        />
      </div>

      <CardHeader className="p-6 pb-4 sm:pb-6 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Langkah {step}
            </span>
            {question.aspect && (
              <span className="text-xs text-gray-500 font-medium">
                • {question.aspect}
              </span>
            )}
          </div>

          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-500 hover:text-red-600 text-xs h-8 px-2.5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Keluar
            </Button>
          )}
        </div>

        <div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            {question.questionText}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1.5">
            {question.questionType === "checkbox"
              ? "Pilih satu atau beberapa jawaban yang sesuai."
              : "Pilih salah satu jawaban yang paling menggambarkan kondisi Anda."}
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="pb-6">
          {question.questionType === "radio" && (
            <RadioGroup
              onValueChange={setSelectedValue}
              value={selectedValue}
              className="space-y-3"
            >
              {question.options.map((option) => {
                const isSelected = selectedValue === option.id.toString();
                return (
                  <label
                    key={option.id}
                    htmlFor={`option-${option.id}`}
                    className={cn(
                      "flex justify-center items-center gap-3.5 p-4 sm:p-4.5 rounded-xl border text-left transition-all cursor-pointer min-h-[52px]",
                      isSelected
                        ? "border-cyan-600 bg-cyan-50/60 text-cyan-950 font-medium ring-1 ring-cyan-600 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50/80 text-gray-800"
                    )}
                  >
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={`option-${option.id}`}
                      className="shrink-0 text-cyan-600 border-gray-400 data-[state=checked]:border-cyan-600 data-[state=checked]:text-cyan-600"
                    />
                    <span className="text-sm sm:text-base leading-relaxed grow">
                      {option.optionText}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          )}

          {question.questionType === "checkbox" && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const isChecked = selectedValues.includes(option.id);
                return (
                  <label
                    key={option.id}
                    htmlFor={`option-${option.id}`}
                    className={cn(
                      "flex items-center p-4 sm:p-4.5 gap-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[52px]",
                      isChecked
                        ? "border-cyan-600 bg-cyan-50/60 text-cyan-950 font-medium ring-1 ring-cyan-600 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50/80 text-gray-800"
                    )}
                  >
                    <Checkbox
                      id={`option-${option.id}`}
                      checked={isChecked}
                      onCheckedChange={() => handleCheckboxChange(option.id)}
                      className="mt-0.5 shrink-0 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    />
                    <span className="text-sm sm:text-base leading-relaxed grow">
                      {option.optionText}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </CardContent>

        <CardFooter className="px-6 py-4 sm:px-8 sm:py-5 border-t bg-slate-50/50 flex items-center justify-between gap-3">
          {canGoBack && onPrev ? (
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer h-11 px-4 sm:px-5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sebelumnya
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="h-11 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg shadow-sm cursor-pointer ml-auto transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Lanjut
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
