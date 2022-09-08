<template>
  <div class="w-full border-collapse overflow-x-auto rounded-lg">
    <TableHeader></TableHeader>
    <TableRow :lions="lions"></TableRow>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      lions: [
        {
          id: '001',
          name: 'Leo Sabotus',
          conservationStatus: 'Preserved Specimen',
          created: '01-01-2022',
          updated: '12-12-2022',
          location: 'Kenya'
        },
        {
          id: '002',
          name: 'Leo Leonus',
          conservationStatus: 'Human Observation',
          created: '01-01-2022',
          updated: '12-12-2022',
          location: 'Kenya'
        },
        {
          id: '003',
          name: 'Leo Fasciculus',
          conservationStatus: 'Machine Observation',
          created: '01-01-2022',
          updated: '12-12-2022',
          location: 'Kenya'
        },
        {
          id: '004',
          name: 'Leo Tiranus',
          conservationStatus: 'Preserved Specimen',
          created: '01-01-2022',
          updated: '12-12-2022',
          location: 'Kenya'
        },
        {
          id: '005',
          name: 'Leo Aegiae',
          conservationStatus: 'Preserved Specimen',
          created: '01-01-2022',
          updated: '12-12-2022',
          location: 'Kenya'
        }
      ]
    }
  }
}
</script>
