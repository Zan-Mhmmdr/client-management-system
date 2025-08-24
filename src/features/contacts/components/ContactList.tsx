import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputWithIcon from "@/components/common/InputWithIcon";
import { contactList } from "../services/contactService";
import { useLocalStorage } from "react-use";

interface Contact {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, _] = useLocalStorage("token", "");

  const fetchContacts = async () => {
    try {
      const response = await contactList(token, { name, email, phone, page });
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        const { data } = responseBody;
        setContacts(data?.contacts || []);
        setTotalPages(data?.total_pages || 1);
      } else {
        const errorMessage =
          responseBody.errors ??
          responseBody.message ??
          `HTTP ${response.status}`;
        alert("Failed to fetch contacts: " + errorMessage);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const handleSearchContacts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", name, email, phone);
    setPage(1);
    await fetchContacts();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleContactDelete = (id: string | number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);
    // Panggil API delete kalau pakai backend
  };

  const getPages = () => Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    console.log("useEffect triggered with", { name, email, phone, page });
    fetchContacts();
  }, [name, email, phone, page]);

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>

      {/* Search Form */}
      <div className="bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7] rounded-xl p-6 mb-8">
        <form onSubmit={handleSearchContacts}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputWithIcon
              id="search_name"
              name="search_name"
              label="Name"
              iconClass="fas fa-user"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputWithIcon
              id="search_email"
              name="search_email"
              label="Email"
              iconClass="fas fa-envelope"
              placeholder="Search by email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputWithIcon
              id="search_phone"
              name="search_phone"
              label="Phone"
              iconClass="fas fa-phone"
              placeholder="Search by phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-5 text-right">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium rounded-lg shadow-md hover:scale-105 transition"
            >
              <i className="fas fa-search mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Contact */}
        <div className="bg-[#0F0F0F] text-[#EAEAEA] border border-dashed border-[#008b8b] shadow-[0_0_20px_#aec8d7] rounded-xl overflow-hidden">
          <Link to="create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#63b0c8] to-[#79dbef] rounded-full flex items-center justify-center mb-5 shadow-lg hover:scale-110 transition-transform">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Create New Contact</h2>
              <p className="text-sm text-gray-300">
                Add a new contact to your list
              </p>
            </div>
          </Link>
        </div>

        {/* Contact List */}
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7] rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <Link
                to={`/dashboard/contacts/${contact.id}`}
                className="block cursor-pointer hover:bg-[#1a1a1a] rounded-lg transition-all p-3"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <i className="fas fa-user text-white" />
                  </div>
                  <h2 className="text-xl font-semibold hover:text-blue-300 transition-colors">
                    {contact.first_name} {contact.last_name}
                  </h2>
                </div>
                <div className="space-y-3 text-sm text-gray-300 ml-2">
                  <p className="flex items-center">
                    <i className="fas fa-user-tag w-6 text-gray-500" />
                    <span className="font-medium w-24">First Name:</span>
                    {contact.first_name}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-user-tag w-6 text-gray-500" />
                    <span className="font-medium w-24">Last Name:</span>
                    {contact.last_name}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope w-6 text-gray-500" />
                    <span className="font-medium w-24">Email:</span>
                    {contact.email}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-phone w-6 text-gray-500" />
                    <span className="font-medium w-24">Phone:</span>
                    {contact.phone}
                  </p>
                </div>
              </Link>
              <div className="mt-4 flex justify-end gap-3">
                <Link
                  to={`/dashboard/contacts/${contact.id}/edit`}
                  className="px-4 py-2 bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 rounded-lg font-medium shadow-md hover:scale-105 transition"
                >
                  <i className="fas fa-edit mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleContactDelete(contact.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium shadow-md hover:scale-105 transition"
                >
                  <i className="fas fa-trash-alt mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-[#0F0F0F] text-[#EAEAEA] border border-[#008b8b] shadow-[0_0_20px_#aec8d7] rounded-xl p-3">
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
            >
              <i className="fas fa-chevron-left mr-2" />
              Previous
            </button>
          )}

          {getPages().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-lg transition ${
                pageNumber === page
                  ? "bg-gradient-to-r from-[#63b0c8] to-[#79dbef] text-slate-800 font-medium shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {page < totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </button>
          )}
        </nav>
      </div>
    </main>
  );
};

export default ContactList;
