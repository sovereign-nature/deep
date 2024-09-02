<script lang="ts">
  import { state, updateState } from './MultipassStates';

  // Function to handle login state toggle
  function toggleLogin() {
    updateState({ isLoggedIn: !$state.isLoggedIn });
  }

  // Function to increment proof count
  function incrementProofCount() {
    updateState({
      proofs: {
        ...$state.proofs,
        proofCount: $state.proofs.proofCount + 1,
        availableProofCount: $state.proofs.availableProofCount + 1,
      },
    });
  }

  // Function to decrement proof count
  function decrementProofCount() {
    if ($state.proofs.proofCount > 0) {
      updateState({
        proofs: {
          ...$state.proofs,
          proofCount: $state.proofs.proofCount - 1,
          availableProofCount: Math.max(
            $state.proofs.availableProofCount - 1,
            0
          ),
        },
      });
    }
  }

  // Function to handle NFT claimed change
  function updateNFTClaimed(event: Event) {
    const input = event.target as HTMLInputElement;
    updateState({
      nft: {
        ...$state.nft,
        claimed: input.checked,
      },
    });
  }

  // Function to increment evolution level (only if unused proofs are available)
  function incrementEvolutionLevel() {
    if ($state.proofs.availableProofCount > 0 && $state.evolution.level < 7) {
      updateState({
        evolution: {
          ...$state.evolution,
          level: $state.evolution.level + 1,
        },
        proofs: {
          ...$state.proofs,
          availableProofCount: $state.proofs.availableProofCount - 1,
        },
      });
    }
  }

  // Function to decrement evolution level (for testing)
  function decrementEvolutionLevel() {
    if ($state.evolution.level > 0) {
      updateState({
        evolution: {
          ...$state.evolution,
          level: $state.evolution.level - 1,
        },
        proofs: {
          ...$state.proofs,
          availableProofCount: $state.proofs.availableProofCount + 1,
        },
      });
    }
  }

  // Reactive statement to handle disabling NFT URL input and resetting evolution level
  $: {
    if ($state.proofs.proofCount === 0) {
      updateState({
        nft: {
          ...$state.nft,
        },
        evolution: {
          ...$state.evolution,
          level: 0,
        },
      });
    }
  }
</script>

<div class="grid grid-cols-2">
  <!-- Login State Toggle -->
  <div class="form-group">
    <span>Login State:</span>
    <div class="radio-group flex gap-5">
      <label>
        <input
          type="radio"
          checked={$state.isLoggedIn}
          on:change={toggleLogin}
        />
        Logged In
      </label>
      <label>
        <input
          type="radio"
          checked={!$state.isLoggedIn}
          on:change={toggleLogin}
        />
        Logged Out
      </label>
    </div>
  </div>

  <!-- Proof Counters -->
  <div class="form-group">
    <span>Proof Count: {$state.proofs.proofCount}</span>
    <button
      class="border border-primary h-10 w-10"
      on:click={incrementProofCount}>+</button
    >
    <button
      class="border border-primary h-10 w-10"
      on:click={decrementProofCount}>-</button
    >
    <div class="mt-2">
      <span>Unused Proof Count: {$state.proofs.availableProofCount}</span>
    </div>
  </div>

  <!-- NFT URL -->
  <div class="form-group" class:opacity-50={$state.nft.status === 'locked'}>
    <span>NFT URL:</span>

    <input
      type="checkbox"
      checked={$state.nft.claimed}
      on:change={updateNFTClaimed}
      disabled={$state.nft.status === 'locked'}
    />
  </div>

  <!-- Evolution Level Counter -->
  <div
    class="form-group"
    class:opacity-50={$state.evolution.status === 'locked'}
  >
    <span>Evolution Level: {$state.evolution.level}</span>
    <button
      class="border border-primary h-10 w-10"
      on:click={incrementEvolutionLevel}>+</button
    >
    <button
      class="border border-primary h-10 w-10"
      on:click={decrementEvolutionLevel}>-</button
    >
  </div>
</div>

<style>
  .form-group {
    margin-bottom: 10px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
</style>
