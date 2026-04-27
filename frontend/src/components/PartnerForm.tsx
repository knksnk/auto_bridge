import { useState, type FormEvent } from "react";
import { partnerService } from "../services/partnerService";
import type { PartnerKind, PartnerLead } from "../types/partners";

interface PartnerFormProps {
  kind: PartnerKind;
  title: string;
}

const emptyLead = (kind: PartnerKind): PartnerLead => ({
  kind,
  name: "",
  company: "",
  phone: "",
  email: "",
  city: "",
  comment: "",
});

export function PartnerForm({ kind, title }: PartnerFormProps) {
  const [lead, setLead] = useState<PartnerLead>(() => emptyLead(kind));

  const update = (key: keyof PartnerLead, value: string) => {
    setLead((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await partnerService.submitLead(lead);
    setLead(emptyLead(kind));
  };

  return (
    <form className="card partner-form" onSubmit={submit}>
      <h2>{title}</h2>
      <input type="text" placeholder="Имя" value={lead.name} onChange={(event) => update("name", event.target.value)} />
      <input type="text" placeholder="Компания" value={lead.company} onChange={(event) => update("company", event.target.value)} />
      <input type="tel" placeholder="Телефон" value={lead.phone} onChange={(event) => update("phone", event.target.value)} />
      <input type="email" placeholder="Email" value={lead.email} onChange={(event) => update("email", event.target.value)} />
      <input type="text" placeholder="Город" value={lead.city} onChange={(event) => update("city", event.target.value)} />
      <textarea placeholder="Комментарий" value={lead.comment} onChange={(event) => update("comment", event.target.value)} />
      <button type="submit">Отправить заявку</button>
    </form>
  );
}
