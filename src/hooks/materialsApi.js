import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const useMaterials = () => useQuery('materials', () => {
  return axios.get(`${baseUrl}/materials`).then(res => res.data);
});

export const useMaterial = (materialId) => useQuery(['materials', materialId], () => {
  return axios.get(`${baseUrl}/materials/${materialId}`).then(res => res.data);
});

export const useCreateMaterial = ({ queryOpts } = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    material => axios.post(`${baseUrl}/materials`, material).then((res) => res.data),
    {
      onMutate: async (material) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('materials');

        // Snapshot the previous value
        const previousMaterials = queryClient.getQueryData('materials')

        // Optimistically update to the new value
        queryClient.setQueryData('materials', old => [...old, { id: uuidv4(), ...material }])

        // Return a context object with the snapshotted value
        return { previousMaterials }
      },
      onError: (err, material, context) => {
        queryClient.setQueryData('materials', context.previousMaterials)
      },
      onSettled: () => {
        queryClient.invalidateQueries('materials')
      },
      ...queryOpts,
    }
  )
};

export const useUpdateMaterial = ({ queryOpts } = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ materialId, updatedMaterial }) => axios.put(`${baseUrl}/materials/${materialId}`, updatedMaterial).then((res) => res.data),
    {
      // @TODO: Update this so that it uses map to apply the optimistic update
      onMutate: async ({ materialId, updatedMaterial }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('materials')
    
        // Snapshot the previous value
        const previousMaterials = queryClient.getQueryData('materials');

        // Optimistically update to the new value
        queryClient.setQueryData('materials', previousMaterials.map(material => {
          if (material.id !== materialId) return material;
          return {
            ...material,
            ...updatedMaterial,
          }
        }));
    
        // Return a context with the previous values
        return { previousMaterials }
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData('materials', context.previousMaterials)
      },
      onSettled: material => {
        queryClient.invalidateQueries('materials')
      },
      ...queryOpts,
    }
  )
};

export const useDeleteMaterial = ({ queryOpts } = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (materialId) => axios.delete(`${baseUrl}/materials/${materialId}`).then((res) => res.data),
    {
      onMutate: async materialId => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('materials')
    
        // Snapshot the previous value
        const previousMaterials = queryClient.getQueryData('materials');

        // Optimistically update to the new value
        queryClient.setQueryData('materials', previousMaterials.filter(material => material.id !== materialId));
    
        // Return a context with the previous values
        return { previousMaterials }
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          'materials',
          context.previousMaterials
        )
      },
      onSettled: material => {
        queryClient.invalidateQueries('materials')
      },
      ...queryOpts,
    }
  )
};

