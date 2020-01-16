using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class PatientDetailsController : ApiController
    {
        private PatientDetailsEntities db = new PatientDetailsEntities();

        // GET api/PatientDetails
        public IQueryable<PATIENTDETAIL> GetPATIENTDETAILS()
        {
            return db.PATIENTDETAILS;
        }

        // GET api/PatientDetails/5
        [ResponseType(typeof(PATIENTDETAIL))]
        public IHttpActionResult GetPATIENTDETAIL(int id)
        {
            PATIENTDETAIL patientdetail = db.PATIENTDETAILS.Find(id);
            if (patientdetail == null)
            {
                return NotFound();
            }

            return Ok(patientdetail);
        }

        // PUT api/PatientDetails/5
        public IHttpActionResult PutPATIENTDETAIL(int id, PATIENTDETAIL patientdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patientdetail.PATIENTID)
            {
                return BadRequest();
            }

            db.Entry(patientdetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PATIENTDETAILExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/PatientDetails
        [ResponseType(typeof(PATIENTDETAIL))]
        public IHttpActionResult PostPATIENTDETAIL(PATIENTDETAIL patientdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PATIENTDETAILS.Add(patientdetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = patientdetail.PATIENTID }, patientdetail);
        }

        // DELETE api/PatientDetails/5
        [ResponseType(typeof(PATIENTDETAIL))]
        public IHttpActionResult DeletePATIENTDETAIL(int id)
        {
            PATIENTDETAIL patientdetail = db.PATIENTDETAILS.Find(id);
            if (patientdetail == null)
            {
                return NotFound();
            }

            db.PATIENTDETAILS.Remove(patientdetail);
            db.SaveChanges();

            return Ok(patientdetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PATIENTDETAILExists(int id)
        {
            return db.PATIENTDETAILS.Count(e => e.PATIENTID == id) > 0;
        }
    }
}