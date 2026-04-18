export type ContactInfo = {
  id?: string;
  address?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
} | null;

let cachedContact: ContactInfo = null;
let pendingContactRequest: Promise<ContactInfo> | null = null;

export async function getContactInfo(): Promise<ContactInfo> {
  if (cachedContact) {
    return cachedContact;
  }

  if (pendingContactRequest) {
    return pendingContactRequest;
  }

  pendingContactRequest = fetch("/api/contact")
    .then(async (res) => {
      if (!res.ok) {
        return null;
      }
      const data = await res.json();
      cachedContact = data;
      return data;
    })
    .catch(() => null)
    .finally(() => {
      pendingContactRequest = null;
    });

  return pendingContactRequest;
}
