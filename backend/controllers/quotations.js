import Quotation from "../models/quotations.js";

export const getQuotations = async (req, res) => {
  const quotations = await Quotation.find().sort([["_id", "desc"]]);
  res.json(quotations);
};

export const getQuotation = async (req, res) => {
  const quotations = await Quotation.findById(req.params.id).populate(
    "companies.company",
    "name"
  );
  res.json(quotations);
};

export const createQuotation = async (req, res) => {
  const {
    name,
    products,
    companies,
    lastDate,
    qType,
    refNo,
    from,
    demandDate,
    demandNumber,
  } = req.body;
  const quotation = new Quotation({
    name,
    products,
    companies,
    lastDate,
    qType,
    refNo,
    from,
    demandDate,
    demandNumber,
  });
  quotation.save();
  res.json(quotation);
};
export const updateQuotation = async (req, res) => {
  const {
    name,
    companies,
    lastDate,
    qType,
    refNo,
    from,
    demandDate,
    demandNumber,
  } = req.body;
  const quotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    {
      name,
      companies,
      lastDate,
      qType,
      refNo,
      from,
      demandDate,
      demandNumber,
    },
    { new: true }
  );
  res.json(quotation);
};

export const updateQuotationProducts = async (req, res) => {
  const { products } = req.body;
  const quotation = await Quotation.findById(req.params.id);

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    {
      products: [...quotation.products, ...products],
    },
    { new: true }
  );
  res.json(quotation);
};

export const addCompanyBid = async (req, res) => {
  const { data } = req.body;

  let quotation = await Quotation.findById(req.params.id);

  data.forEach(async (d) => {
    const { company, product, price } = d;

    const i = quotation.companies.findIndex((c) => c.company === company);

    quotation.companies[i].bids.push({ product, price });
  });

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    quotation,
    { new: true }
  );
  res.json(updatedQuotation);
};
