# Sri Venkateshwara Precast Walls

Customer app for a Hyderabad precast compound-wall manufacturer — quote estimator, gallery, and site-visit booking.

## Streamlit (deploy this)

Main file for [Streamlit Community Cloud](https://share.streamlit.io): **`streamlit.py`**

```bash
pip install -r requirements.txt
streamlit run streamlit.py --server.address 0.0.0.0
```

On Streamlit Cloud: New app → this repo → Main file path `streamlit.py`.

Optional secrets / env:

- `LEADS_API_URL` — POST JSON leads (`name`, `phone`, `location`, `land_size`, `project_type`)
- `GALLERY_API_URL` — GET JSON gallery (`title`, `category`, `image_url`)

## React site

```bash
npm install
npm run dev
```
