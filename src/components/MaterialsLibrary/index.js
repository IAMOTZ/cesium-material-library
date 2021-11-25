import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import MaterailList from './MaterialList';
import MaterialForm from './MaterialForm';



const defaultMaterial = {
  name: 'New Material',
  volume: null,
  deliveryDate: null,
  color: 'blue',
  cost: null,
}

const MaterialsLibrary = ({ materials=[], createMaterial, updateMaterial, deleteMaterial }) => {

  const [selectedMaterialId, setSelectedMaterialId] = React.useState(null);
  const selectMaterial = (materialId) => setSelectedMaterialId(materialId);

  useEffect(() => {
    if (materials.length && !selectedMaterialId) selectMaterial(materials[0].id)
  }, [materials, selectedMaterialId])


  return (
    <>
      <Button
        onClick={async () => {
          const material = await createMaterial(defaultMaterial);
          selectMaterial(material.id);
        }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Button
        disabled={!selectedMaterialId}
        onClick={() => {
          deleteMaterial(selectedMaterialId);
          if (materials.length) selectMaterial(materials[0].id)
        }}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <MaterailList materials={materials} selectMaterial={selectMaterial} selectedMaterialId={selectedMaterialId} />
      {(selectedMaterialId) && (
        <MaterialForm
          material={materials.find((material) => material.id == selectedMaterialId)}
          updateMaterial={updateMaterial}
          createMaterial={createMaterial}
        />
      )}
    </>
  )

};

export default MaterialsLibrary;