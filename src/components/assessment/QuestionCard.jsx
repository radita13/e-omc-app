"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function QuestionCard({ question, onSubmitAnswer, isLoading }) {
  const [selectedValue, setSelectedValue] = useState(null); // Untuk radio
  const [selectedValues, setSelectedValues] = useState([]); // Untuk checkbox

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

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{question.aspect || "Pertanyaan"}</CardTitle>
        <CardDescription>{question.questionText}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {question.questionType === "radio" && (
            <RadioGroup onValueChange={setSelectedValue} value={selectedValue}>
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 py-2"
                >
                  <RadioGroupItem
                    value={option.id.toString()}
                    id={`option-${option.id}`}
                  />
                  <Label htmlFor={`option-${option.id}`}>
                    {option.optionText}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.questionType === "checkbox" && (
            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 py-2"
                >
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={selectedValues.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  />
                  <Label htmlFor={`option-${option.id}`}>
                    {option.optionText}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading ||
              (question.questionType === "radio" && !selectedValue) ||
              (question.questionType === "checkbox" &&
                selectedValues.length === 0)
            }
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Lanjut"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
