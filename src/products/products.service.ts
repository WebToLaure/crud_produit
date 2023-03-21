import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ILike } from 'typeorm';



/**
 * @class ProductsService
 * 
 * Une classe permettant :
 * * De générer des requêtes SQL précise à une demande spécifique.
 * * Celle-ci est liée uniquement à des requêtes CREATE, GET ALL / By Id, UPDATE et DELETE pour la partie produit.
 */
@Injectable()
export class ProductsService {

   /** 
     * @method createProduct :
     * * Methode avec requête SQL permettant de créer un nouveau produit avec "name, price et quantity" comme paramètres. 
     */
  async createProduct(createProductDto: CreateProductDto) {
    const product = Product.create({ ...createProductDto });
    return await product.save()
  }


/** 
     * @method findAllProdutcts :
     * * Method avec requête SQL permettant de récupérer tous les produits existants. 
     */
  async findAllProducts() {
    const response =  await Product.find();
    return response;
  }

  /** 
     * @method findProductById :
     * * Method avec requête SQL permettant de récupérer un produit existant via son id comme paramètre. 
     */
  async findProductById(id: number) {
    const product = await Product.findOneBy({ id });
    if (!product) {
      return undefined;
    }
    return product;
  }


  /** 
     * @method update :
     * * Method avec requête SQL permettant de modifier ou de mettre jour les données d'un produit . 
     */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await Product.update(+id, updateProductDto);
    if (updatedProduct) {
      return Product.findOneBy({id})
    }
    return undefined;
  }


  /** 
     * @method deleteProduct :
     * * Method avec requête SQL permettant de supprimer un produit via son id comme paramètre. 
     */
  async deleteProduct(id: number) {
    return (await Product.delete({ id })).affected;;
  }


  
}
