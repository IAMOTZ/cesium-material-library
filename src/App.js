import React from 'react';
import './App.css';
import MaterialsLibrary from './components/MaterialsLibrary';
import { useMaterials, useUpdateMaterial, useCreateMaterial, useDeleteMaterial } from './hooks/materialsApi';


function App() {

  const { isLoading, data, error } = useMaterials();

  const { mutateAsync: createMaterial } = useCreateMaterial();
  const { mutateAsync: deleteMaterial } = useDeleteMaterial();
  const { mutateAsync: updateMaterial } = useUpdateMaterial();

  if(error) return <h2>Error loading material library!</h2>

  return (
      <div className="App">
        <h2>Hello!</h2>
        {isLoading ? 'Material Library is loading...' :
          (<MaterialsLibrary
            materials={data}
            createMaterial={createMaterial}
            updateMaterial={updateMaterial}
            deleteMaterial={deleteMaterial}
          />)
        }
      </div>
  );
}

export default App;
