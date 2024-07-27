export const getUsers = async () => {
  try {
    const data = await fetch('/api/collaborators');
    return data;
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    throw new Error('API ERROR');
  }
};