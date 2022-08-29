<template>
  <div class="flex w-full justify-center">
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr class="bg-neutral text-white border-b-2 border-primary">
            <th class="bg-inherit text-inherit font-light">Id</th>
            <th class="bg-inherit text-inherit font-light">Name</th>
            <th class="bg-inherit text-inherit font-light">Location</th>
            <th class="bg-inherit text-inherit font-light">Created</th>
            <th class="bg-inherit text-inherit font-light">Updated</th>
            <th class="bg-inherit text-inherit font-light">
              Conservation status
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr class="bg-neutral text-white border-b-2 border-primary">
            <td class="bg-inherit font-light">001</td>
            <td class="bg-inherit font-light">Leo Sabotus</td>
            <td class="bg-inherit font-light">
              <span class="border border-2 rounded-md p-2"
                >Preserved Specimen</span
              >
            </td>
            <td class="bg-inherit font-light">01-01-2022</td>
            <td class="bg-inherit font-light">12-12-2022</td>
            <td class="bg-inherit font-light">Kenya</td>
          </tr>
          <!-- row 2 -->
          <tr class="bg-neutral text-white border-primary">
            <td class="bg-inherit font-light">002</td>
            <td class="bg-inherit font-light">Leo Supremus</td>
            <td class="bg-inherit font-light">
              <span class="border border-2 rounded-md p-2"
                >Preserved Specimen</span
              >
            </td>
            <td class="bg-inherit font-light">01-01-2022</td>
            <td class="bg-inherit font-light">12-12-2022</td>
            <td class="bg-inherit font-light">Kenya</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
