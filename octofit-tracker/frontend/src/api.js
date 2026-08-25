export function normalizeCollection(payload, collectionKey) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const directValue = payload[collectionKey];
  if (Array.isArray(directValue)) {
    return directValue;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.docs)) {
    return payload.docs;
  }

  if (payload.data && Array.isArray(payload.data.results)) {
    return payload.data.results;
  }

  return [];
}

export async function fetchCollection(apiBaseUrl, collectionKey) {
  const response = await fetch(`${apiBaseUrl}/api/${collectionKey}/`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  return normalizeCollection(payload, collectionKey);
}
