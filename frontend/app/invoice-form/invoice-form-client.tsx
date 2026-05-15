"use client";

import { FormEvent, useState } from "react";

type InvoiceFormState = {
  subject: string;
  client: string;
  status: string;
  currency: string;
  totalAmount: string;
  discount: string;
  monthNumber: string;
  invoiceDate: string;
  lastReminderDate: string;
  studentsCount: number;
  students: string[];
};

const initialState: InvoiceFormState = {
  subject: "",
  client: "",
  status: "draft",
  currency: "USD",
  totalAmount: "",
  discount: "",
  monthNumber: "",
  invoiceDate: "",
  lastReminderDate: "",
  studentsCount: 1,
  students: [""],
};

export function InvoiceFormClient() {
  const [form, setForm] = useState<InvoiceFormState>(initialState);
  const [result, setResult] = useState("");

  function updateStudentsCount(nextCount: number) {
    const safeCount = Math.max(1, nextCount || 1);
    setForm((current) => ({
      ...current,
      studentsCount: safeCount,
      students: Array.from(
        { length: safeCount },
        (_, index) => current.students[index] ?? "",
      ),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setResult(
      JSON.stringify(
        {
          subject: form.subject,
          client: form.client,
          status: form.status,
          currency: form.currency,
          total_amount: form.totalAmount,
          discount: form.discount,
          month_no: form.monthNumber,
          invoice_date: form.invoiceDate,
          last_reminder_date: form.lastReminderDate || null,
          students_count: form.studentsCount,
          students: form.students,
        },
        null,
        2,
      ),
    );
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            value={form.subject}
            onChange={(event) => setForm({ ...form, subject: event.target.value })}
            placeholder="March tuition"
          />
        </div>
        <div className="field">
          <label htmlFor="client">Client</label>
          <input
            id="client"
            value={form.client}
            onChange={(event) => setForm({ ...form, client: event.target.value })}
            placeholder="Parent or company name"
          />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="issued">Issued</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={form.currency}
            onChange={(event) => setForm({ ...form, currency: event.target.value })}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="EGP">EGP</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="totalAmount">Total amount</label>
          <input
            id="totalAmount"
            type="number"
            value={form.totalAmount}
            onChange={(event) => setForm({ ...form, totalAmount: event.target.value })}
            placeholder="0.00"
          />
        </div>
        <div className="field">
          <label htmlFor="discount">Discount</label>
          <input
            id="discount"
            type="number"
            value={form.discount}
            onChange={(event) => setForm({ ...form, discount: event.target.value })}
            placeholder="0"
          />
        </div>
        <div className="field">
          <label htmlFor="monthNumber">Month number</label>
          <input
            id="monthNumber"
            type="number"
            value={form.monthNumber}
            onChange={(event) => setForm({ ...form, monthNumber: event.target.value })}
            placeholder="3"
          />
        </div>
        <div className="field">
          <label htmlFor="studentsCount">Students count</label>
          <input
            id="studentsCount"
            type="number"
            min={1}
            value={form.studentsCount}
            onChange={(event) => updateStudentsCount(Number(event.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="invoiceDate">Invoice date</label>
          <input
            id="invoiceDate"
            type="date"
            value={form.invoiceDate}
            onChange={(event) => setForm({ ...form, invoiceDate: event.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="lastReminderDate">Last reminder date</label>
          <input
            id="lastReminderDate"
            type="date"
            value={form.lastReminderDate}
            onChange={(event) =>
              setForm({ ...form, lastReminderDate: event.target.value })
            }
          />
        </div>
        <div className="field full">
          <label>Students</label>
          <div className="student-grid">
            {Array.from({ length: form.studentsCount }, (_, index) => (
              <div key={index} className="student-card">
                <label htmlFor={`student-${index + 1}`}>Student {index + 1}</label>
                <input
                  id={`student-${index + 1}`}
                  value={form.students[index] ?? ""}
                  onChange={(event) => {
                    const nextStudents = [...form.students];
                    nextStudents[index] = event.target.value;
                    setForm({ ...form, students: nextStudents });
                  }}
                  placeholder="Student name"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <button type="submit" className="pill pill-primary button">
          Generate payload
        </button>
        <button
          type="button"
          className="pill pill-secondary button"
          onClick={() => {
            setForm(initialState);
            setResult("");
          }}
        >
          Reset form
        </button>
      </div>
      {result ? <pre className="result">{result}</pre> : null}
    </form>
  );
}
