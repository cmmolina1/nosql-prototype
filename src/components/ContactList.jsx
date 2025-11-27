// src/components/ContactList.jsx
function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return <p>Aún no hay contactos. Crea uno nuevo mediante el formulario.</p>;
  }

  return (
    <table className="contacts-table">
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>Email</th>
          <th>País</th>
          <th>Activo</th>
          <th>Nota</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map((c) => (
          <tr key={c.id}>
            <td>{c.fullName}</td>
            <td>{c.email}</td>
            <td>{c.country}</td>
            <td><input type="checkbox" checked={!!c.isActive} readOnly /></td>
            <td>{c.note}</td>
            <td>
              <button onClick={() => onEdit(c)}>Editar</button>
              <button onClick={() => onDelete(c.id)} className="danger">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactList;

