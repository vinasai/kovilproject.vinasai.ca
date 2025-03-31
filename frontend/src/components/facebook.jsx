import React from 'react'

const facebook = () => {
  return (
    <div><div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-2xl shadow-lg">
    <h2 className="text-lg font-bold mb-4 text-center">Follow Us on Facebook</h2>
    <div className="overflow-hidden rounded-md">
      <iframe
        src=
        "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fvinaayagar%2F%3Fref%3Dembed_page%23&tabs=timeline%2CEvents%2C%20Messages&width=440&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
        width="100%"
        height="400"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Page"
      ></iframe>
    </div>
  </div></div>
  )
}

export default facebook