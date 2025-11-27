// src/App.jsx
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const contactsCollection = collection(db, "contacts");

  useEffect(() => {
    const unsubscribe = onSnapshot(contactsCollection, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setContacts(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveContact = async (contactData) => {
    try {
      if (contactData.id) {
        const ref = doc(db, "contacts", contactData.id);
        await updateDoc(ref, {
          fullName: contactData.fullName,
          email: contactData.email,
          country: contactData.country,
          isActive: contactData.isActive,
          note: contactData.note,
        });
      } else {
        await addDoc(contactsCollection, {
          fullName: contactData.fullName,
          email: contactData.email,
          country: contactData.country,
          isActive: contactData.isActive,
          note: contactData.note,
          createdAt: serverTimestamp(),
        });
      }
      setEditingContact(null);
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const ref = doc(db, "contacts", id);
      await deleteDoc(ref);
      if (editingContact && editingContact.id === id) {
        setEditingContact(null);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="app-container">
      <h1>Prototipo NoSQL - Contactos</h1>

      <div className="layout">
        <div className="card">
          <h2>{editingContact ? "Editar Contacto" : "Nuevo Contacto"}</h2>
          <ContactForm
            key={editingContact ? editingContact.id : "new"}
            initialData={editingContact}
            onSave={handleSaveContact}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="card">
          <h2>Lista de Contactos</h2>
          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </div>
      </div>
    </div>
  );
}

export default App;


