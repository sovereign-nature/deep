<script lang="ts">
  import {
    multipassStepConfig,
    multipassData,
    updateState,
    proofStepState,
    nftStepState,
    evolveStepState,
  } from '../../features/MultipassStates';

  // Function to handle login state toggle
  function toggleLogin() {
    updateState({ isLoggedIn: !$multipassData.isLoggedIn });
  }

  // Function to increment proof count
  function incrementProofCount() {
    updateState({
      proofs: {
        ...$multipassData.proofs,
        proofCount: $multipassData.proofs.proofCount + 1,
        availableProofCount: $multipassData.proofs.availableProofCount + 1,
      },
    });
  }

  // Function to decrement proof count
  function decrementProofCount() {
    if ($multipassData.proofs.proofCount > 0) {
      updateState({
        proofs: {
          ...$multipassData.proofs,
          proofCount: $multipassData.proofs.proofCount - 1,
          availableProofCount: Math.max(
            $multipassData.proofs.availableProofCount - 1,
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
        ...$multipassData.nft,
        DID: input.checked ? 'test' : null,
      },
    });
  }

  // Function to increment evolution level (only if unused proofs are available)
  function incrementEvolutionLevel() {
    if (
      $multipassData.proofs.availableProofCount > 0 &&
      $multipassData.evolution.level < 7
    ) {
      updateState({
        evolution: {
          ...$multipassData.evolution,
          level: $multipassData.evolution.level + 1,
        },
        proofs: {
          ...$multipassData.proofs,
          availableProofCount: $multipassData.proofs.availableProofCount - 1,
        },
      });
    }
  }

  // Function to decrement evolution level (for testing)
  function decrementEvolutionLevel() {
    if ($multipassData.evolution.level > 0) {
      updateState({
        evolution: {
          ...$multipassData.evolution,
          level: $multipassData.evolution.level - 1,
        },
        proofs: {
          ...$multipassData.proofs,
          availableProofCount: $multipassData.proofs.availableProofCount + 1,
        },
      });
    }
  }

  // Reactive statement to handle disabling NFT URL input and resetting evolution level
  $: {
    if ($multipassData.proofs.proofCount === 0) {
      updateState({
        nft: {
          ...$multipassData.nft,
        },
        evolution: {
          ...$multipassData.evolution,
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
          checked={$multipassData.isLoggedIn}
          on:change={toggleLogin}
        />
        Logged In
      </label>
      <label>
        <input
          type="radio"
          checked={!$multipassData.isLoggedIn}
          on:change={toggleLogin}
        />
        Logged Out
      </label>
    </div>
  </div>

  <!-- Proof Counters -->
  <div class="form-group">
    <span>Proof Count: {$multipassData.proofs.proofCount}</span>
    <button
      class="border border-primary h-10 w-10"
      on:click={incrementProofCount}>+</button
    >
    <button
      class="border border-primary h-10 w-10"
      on:click={decrementProofCount}>-</button
    >
    <div class="mt-2">
      <span
        >Unused Proof Count: {$multipassData.proofs.availableProofCount}</span
      >
    </div>
    <div class="mt-2 flex flex-col">
      <span
        >Proof Step stepStatus: {$multipassStepConfig.proofs.stepStatus}</span
      >
      <span>Proof Step State: {$proofStepState}</span>
    </div>
  </div>

  <!-- NFT URL -->
  <div
    class="form-group"
    class:opacity-50={$multipassStepConfig.nft.stepStatus === 'locked'}
  >
    <span>NFT URL:</span>

    <input
      type="checkbox"
      checked={$multipassStepConfig.nft.claimed}
      on:change={updateNFTClaimed}
      disabled={$multipassStepConfig.nft.stepStatus === 'locked'}
    />
    <div class="mt-2 flex flex-col">
      <span>NFT Step stepStatus: {$multipassStepConfig.nft.stepStatus}</span>
      <span>NFT Step State: {$nftStepState}</span>
    </div>
  </div>

  <!-- Evolution Level Counter -->
  <div
    class="form-group"
    class:opacity-50={$multipassStepConfig.evolution.stepStatus === 'locked'}
  >
    <span>Evolution Level: {$multipassData.evolution.level}</span>
    <button
      class="border border-primary h-10 w-10"
      on:click={incrementEvolutionLevel}>+</button
    >
    <button
      class="border border-primary h-10 w-10"
      on:click={decrementEvolutionLevel}>-</button
    >
    <div class="mt-2 flex flex-col">
      <span
        >Evolution Step stepStatus: {$multipassStepConfig.evolution
          .stepStatus}</span
      >
      <span>Evolution Step State: {$evolveStepState}</span>
    </div>
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
