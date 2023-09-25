<script lang="ts">
  import { SNI_API_URL } from '@sni/constants';
  export let assetID: string;
  export let altText: string;
  export let className = '';

  const API_BASE_URL = SNI_API_URL;
  const imageRequestConfig = '?type=webp&withoutEnlargment&quality=80';
</script>

<img
  class="{className} object-cover"
  style="width: inherit"
  srcset="{`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=400 400w,`}
            {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=600 600w,`}
            {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=800 800w,`}
            {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=1000 1000w,`}
            {`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=1200 1100w,`}"
  src={`${API_BASE_URL}/assets/${assetID}${imageRequestConfig}&width=1100`}
  alt={altText}
/>
