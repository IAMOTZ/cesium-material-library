import React from 'react';

const MaterialsList = ({ materials = [], selectMaterial, selectedMaterialId }) => {
  return materials.map(material => (
    <div  class={material.id === selectedMaterialId ? 'selected' : ''} onClick={() => selectMaterial(material.id)}>
      {material.name}
    </div>
  ))
}

export default MaterialsList;
