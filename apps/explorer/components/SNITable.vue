<template>
  <div class="flex w-full justify-center">
    <div class="w-full overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr class="border-b-2 border-primary bg-neutral text-white">
            <th class="bg-inherit font-light text-inherit">Id</th>
            <th class="bg-inherit font-light text-inherit">Name</th>
            <th class="bg-inherit font-light text-inherit">Location</th>
            <th class="bg-inherit font-light text-inherit">Created</th>
            <th class="bg-inherit font-light text-inherit">Updated</th>
            <th class="bg-inherit font-light text-inherit">
              Conservation status
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr class="border-b-2 border-primary bg-neutral text-white">
            <td class="bg-inherit font-light">001</td>
            <td class="bg-inherit font-light">Leo Sabotus</td>
            <td class="bg-inherit font-light">
              <span class="rounded-md border-2 p-2">Preserved Specimen</span>
            </td>
            <td class="bg-inherit font-light">01-01-2022</td>
            <td class="bg-inherit font-light">12-12-2022</td>
            <td class="bg-inherit font-light">Kenya</td>
          </tr>
          <!-- row 2 -->
          <tr class="border-primary bg-neutral text-white">
            <td class="bg-inherit font-light">002</td>
            <td class="bg-inherit font-light">Leo Supremus</td>
            <td class="bg-inherit font-light">
              <span class="rounded-md border-2 p-2">Preserved Specimen</span>
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
