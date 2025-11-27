// src/components/ContactForm.jsx
import { useEffect, useState } from "react";

const initialForm = {
  id: null,
  fullName: "",
  email: "",
  country: "",
  isActive: false,
  note: "",
};

function ContactForm({ initialData, onSave, onCancelEdit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        country: initialData.country || "",
        isActive: initialData.isActive ?? false,
        note: initialData.note || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de email no válido";
    }

    if (!form.country) {
      newErrors.country = "Seleccione un país";
    }

    if (!form.note.trim()) {
      newErrors.note = "La nota es obligatoria";
    } else if (form.note.trim().length < 10) {
      newErrors.note = "La nota debe tener mínimo 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    setForm(initialForm);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <div className="form-group">
        <label>Nombre Completo *</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Ej: Cristian Molina"
        />
        {errors.fullName && <small className="error">{errors.fullName}</small>}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="cmmolina@espe.edu.ec"
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <div className="form-group">
        <label>País *</label>
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">-- Seleccione un país --</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Colombia">Colombia</option>
          <option value="Perú">Perú</option>
          <option value="Chile">Chile</option>
        </select>
        {errors.country && <small className="error">{errors.country}</small>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Contacto activo
        </label>
      </div>

      <div className="form-group">
        <label>Nota *</label>
        <textarea
          name="note"
          rows="3"
          value={form.note}
          onChange={handleChange}
          placeholder="Información adicional sobre el contacto"
        />
        {errors.note && <small className="error">{errors.note}</small>}
      </div>

      <div className="form-actions">
        <button type="submit">
          {form.id ? "Actualizar" : "Guardar"}
        </button>

        {form.id && (
          <button type="button" onClick={handleCancel} className="secondary">
            Cancelar
          </button>
        )}
      </div>

    </form>
  );
}

export default ContactForm;

