'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "845946083ca7a3f064dd2caa723fa2e4",
"assets/AssetManifest.bin.json": "8f261e145643efd7fdfb586e5d895ce7",
"assets/AssetManifest.json": "ae916ff780e74c6016acb9f904390fac",
"assets/assets/build_date.txt": "ad230736a6c994c76481d732111b2595",
"assets/assets/env.json": "ab10a91cd43c32a5f87087e31cd6e890",
"assets/assets/fonts/Quicksand-Bold.ttf": "410a26014ce7e25824ae18349d2c92d3",
"assets/assets/fonts/Quicksand-Light.ttf": "7dcc3e19fb99b72cf354f6caee2df104",
"assets/assets/fonts/Quicksand-Medium.ttf": "7e2479fe3619b4b56dbfc0094ff23a3c",
"assets/assets/fonts/Quicksand-Regular.ttf": "9a891411c3856f2db214f3507349a424",
"assets/assets/fonts/Quicksand-SemiBold.ttf": "feb6fb672a260bc45a8bfb278e233772",
"assets/assets/images/app_icon.png": "76928d42d7325ec76271b69277d52d76",
"assets/assets/images/app_logo.png": "1aa431e574a71f484a70d8ceb2d3bcc0",
"assets/assets/images/drawer_logo.png": "334399d1356f6e4ee262fd9c82106a2e",
"assets/assets/images/empty.webp": "a678dd16d1164297041479b00350f229",
"assets/assets/images/jailbreak.png": "91a3798dbd1d215ee9531da14a74fbf5",
"assets/assets/images/notification_logo.png": "27a4e96ee60d7ae4f3785d342ef0247d",
"assets/assets/images/o2bizLogo.png": "34b84eda3966dfe7f8d3e40ddc2fc5ce",
"assets/assets/images/root.png": "d9df0019f5fe9a8e3007f7d9867d4a65",
"assets/assets/images/ssl/app_icon.png": "252ea023d7e431ae2e7516c3e1e9ad16",
"assets/assets/images/ssl/app_logo.png": "09cde973360696d04d3c571d33e584a7",
"assets/assets/images/ssl/drawer_logo.png": "4b3e6c5c7fcce496608438d830716e18",
"assets/assets/images/ssl/notification_logo.png": "c28352ea736e675c1d3a9a230a8d9dd8",
"assets/FontManifest.json": "dfc991a797e74c8d26bc2855fbebaf59",
"assets/fonts/MaterialIcons-Regular.otf": "86be2260019467b58024650b4371645a",
"assets/NOTICES": "8740de88080b7133faa9fb500a81dbfe",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "401abeadd5ae101ae712d55ebe88d167",
"assets/packages/fluttertoast/assets/toastify.css": "910ddaaf9712a0b0392cf7975a3b7fb5",
"assets/packages/fluttertoast/assets/toastify.js": "18cfdd77033aa55d215e8a78c090ba89",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "b390e3b06c3b661badce31ec059f4321",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "b1d84df1727eb8ef37d10cf082c66b4f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "147676da1040a4d0466e77ed88cf125b",
"assets/packages/im_stepper/assets/me.jpg": "487511e754834bdf2e6771376d59707e",
"assets/packages/syncfusion_flutter_datagrid/assets/font/FilterIcon.ttf": "b8e5e5bf2b490d3576a9562f24395532",
"assets/packages/syncfusion_flutter_datagrid/assets/font/UnsortIcon.ttf": "acdd567faa403388649e37ceb9adeb44",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "9c08cb6ac0c3ef75b4ad5931affb3103",
"favicon.png": "92c091641acc90cc838f1465760c6782",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "682866c7f12ff44830386843870a90c2",
"icons/Icon-512.png": "a7b792bdd74670619acd79835520c64c",
"icons/Icon-maskable-192.png": "682866c7f12ff44830386843870a90c2",
"icons/Icon-maskable-512.png": "a7b792bdd74670619acd79835520c64c",
"index.html": "9baffe1a95da1fd6f000388acfcd320b",
"/": "9baffe1a95da1fd6f000388acfcd320b",
"main.dart.js": "3bc7ee4bf2e8d71a7ab93301720cea90",
"manifest.json": "2c424c6e6d64a7096e265993d3491bfd",
"version.json": "00afd223cdfd9cc2b3e74d81817cc29d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
